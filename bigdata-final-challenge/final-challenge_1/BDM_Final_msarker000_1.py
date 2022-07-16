def createIndex(shapefile):
    import rtree
    import fiona.crs
    import geopandas as gpd
    zones = gpd.read_file(shapefile).to_crs(fiona.crs.from_epsg(2263))
    index = rtree.Rtree()
    for idx,geometry in enumerate(zones.geometry):
        index.insert(idx, geometry.bounds)
    return (index, zones)

def findZone(p, index, zones):
    if not p.is_valid:
        return None
    match = index.intersection((p.x, p.y, p.x, p.y))
    for idx in match:
        if zones.geometry[idx].is_valid and int(zones['plctrpop10'][idx]) > 0 and zones.geometry[idx].contains(p):
            return (zones['plctract10'][idx], zones['plctrpop10'][idx])
    return None

def readDrugWords(inputFile1, inputFile2):
    import csv
    words =  []
    with open(inputFile1) as file1, open(inputFile2) as file2:
        reader = csv.reader(file1)
        for word in reader:
            words.append(set(word[0].strip().split()))
            
        reader = csv.reader(file2)
        for word in reader:
            words.append(set(word[0].strip().split()))          
    return words;

def processTweets(pid, tweets):
    import csv
    import pyproj
    import shapely.geometry as geom
    
    proj = pyproj.Proj(init="epsg:2263", preserve_units=True)    
    index, zones = createIndex('500cities_tracts.geojson')    
    
    reader = csv.reader(tweets, delimiter='|')
    setOfDrugWords = readDrugWords('drug_illegal.txt', 'drug_sched2.txt')
    
    for row in reader:
        if len(row) < 7:
            continue
            
        lat, lon, tweetText = row[1], row[2],  row[6]
        setOfTweetWords = set(tweetText.lower().strip().split())
        for  setOfDrugWord in setOfDrugWords:
            if len(setOfDrugWord.intersection(setOfTweetWords)) >= len(setOfDrugWord):
                geoPoint = geom.Point(proj(float(lon), float(lat)))
                zone = findZone(geoPoint, index, zones)
                if zone != None:
                    yield (zone, 1.0)

from pyspark import SparkContext
import sys
from pyspark.sql import SQLContext

if __name__ == "__main__":
    tweetFile=sys.argv[-2]
    sc = SparkContext()
    rdd = sc.textFile(tweetFile, use_unicode=False) \
           .mapPartitionsWithIndex(processTweets) \
           .reduceByKey(lambda x,y:x+y) \
	   .map(lambda x: (x[0][0], x[1]/x[0][1])) \
	   .sortByKey(ascending=True) \
           .cache()

    sqlContext = SQLContext(sc)
    df = sqlContext.createDataFrame(rdd,('plctract10','tweetpopratio'))
    df.coalesce(1).write.mode("overwrite").format("com.databricks.spark.csv").option("header", "true").save(sys.argv[-1])

