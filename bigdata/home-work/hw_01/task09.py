#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jan 31 21:36:33 2019

@author: ayub
"""
import json
import datetime

from pprint import pprint

with open('data/metadata.json', encoding='utf-8') as f:
    data = json.load(f)

pprint(datetime.datetime.fromtimestamp(data['createdAt']).strftime("%Y-%m-%d %H:%M:%S")) 




