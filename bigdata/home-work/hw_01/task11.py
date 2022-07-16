#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb  1 23:10:41 2019

@author: ayub

this program reads a stations.json file and print in below format
 
<STATION_NAME> : <LATITUDE>,<LONGITUDE>

"""
import json
import sys

if __name__=='__main__':
    try:
        jsonfile= sys.argv[1]
        with open(jsonfile) as f:
            data = json.load(f)
        stations = data['stationBeanList']
        for station in stations:
            print('%s : %s,%s' %(station['stationName'], station['latitude'], station['longitude']))
    except IndexError: 
        print("Error: Please correct your command format[python task11.py stations.json]")
    except IOError:
        print("Error: can\'t find file or read data")    
    
