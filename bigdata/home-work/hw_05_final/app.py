def createIndex(shapefile):
    import rtree
    import fiona.crs
    import geopandas as gpd
    zones = gpd.read_file(shapefile).to_crs(fiona.crs.from_epsg(2263))
    index = rtree.Rtree()
    for idx,geometry in enumerate(zones.geometry):
        index.insert(idx, geometry.bounds)
    return (index, zones)


def findPickupNeighborZone(p, index, zones):
    match = index.intersection((p.x, p.y, p.x, p.y))
    for idx in match:
        if zones.geometry[idx].contains(p):
            return zones['neighborhood'][idx]
    return None

def findDropoffBroughZone(p, index, zones):
    match = index.intersection((p.x, p.y, p.x, p.y))
    for idx in match:
        if zones.geometry[idx].contains(p):
            return zones['borough'][idx]
    return None


def isValidRow(row):
    if len(row) < 11 or row[5] == 'NULL' or row[6] == 'NULL' or row[9] == 'NULL'or row[10] =='NULL':
	return False
    if row[5] == '' or row[6] == '' or row[9] == '' or row[10] =='':
	return False
    return True


def processTrips(pid, records):
    import csv
    import pyproj
    import shapely.geometry as geom
    
    proj = pyproj.Proj(init="epsg:2263", preserve_units=True)    
    index, zones = createIndex('neighborhoods.geojson')   
    
    if pid==0:
        next(records)

    reader = csv.reader(records)
    
    for row in reader:

        if not isValidRow(row):
           continue

        pickupPoint = geom.Point(proj(float(row[5]), float(row[6])))
        dropOffPoint =   geom.Point(proj(float(row[9]), float(row[10])))

        pickupZone = findPickupNeighborZone(pickupPoint, index, zones)
        dropOffZone = findDropoffBroughZone(dropOffPoint, index, zones)
        
        if pickupZone != None and  dropOffZone != None :
            yield ((dropOffZone, pickupZone), 1)
            
from pyspark import SparkContext
from heapq import nlargest

if __name__ == "__main__":
        sc = SparkContext()
        rdd = sc.textFile('yellow_tripdata_2011-05.csv')
        rdd.mapPartitionsWithIndex(processTrips) \
               .reduceByKey(lambda x,y: x+y) \
               .map(lambda x: (x[0][0], (x[0][1], x[1]))) \
               .groupByKey() \
               .flatMap(lambda x: (x[0], nlargest(3,x[1],key=lambda e:e[1]))) \
               .saveAsTextFile('output7')
