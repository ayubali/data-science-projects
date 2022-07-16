hadoop fs -rm -r -skipTrash tweet_out

spark-submit --conf spark.executor.memoryOverhead=512m --executor-cores 5 --num-executors 10 --executor-memory 16g \
 --files hdfs:///data/share/bdm/500cities_tracts.geojson,hdfs:///data/share/bdm/drug_illegal.txt,hdfs:///data/share/bdm/drug_sched2.txt \
  BDM_Final_msarker000_1.py hdfs:///data/share/bdm/tweets-100m.csv tweet_out

#hdfs:///data/share/bdm/tweets-100m.csv
#hdfs:///user/msarker000/tweet_text.csv
