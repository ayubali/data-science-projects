#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Jan 31 21:23:03 2019

@author: ayub
"""

import fileinput

if __name__=='__main__':
    myList = []
    for line in fileinput.input():
        number = int(line.strip())
        myList.append(number)
    myList.sort()
    print (myList[int(len(myList)/2)])