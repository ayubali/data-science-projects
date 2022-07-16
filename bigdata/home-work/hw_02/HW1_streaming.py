#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Feb  1 23:10:41 2019

@author: ayub

This class read sales data from sale.csv and produce output csv file contains
 product wise customer count and total items cost

[python HW1_streaming.py <INPUT_CSV> <OUTPUT_CSV>]

"""
import csv
import sys


def csvRows(filename):
    with open(filename, 'r') as fi:
        reader = csv.DictReader(fi)
        for row in reader:
            yield(row)
            


def main(input_csv, output_csv):
    # Read data from stream and count number of customer of each product
    # Customer_dict is used to store product ID and customer count
    # item_cost_dict is used to store sum of item cost for each 
    # last_seen_customer_ids_dict is used to keep track of last customar ID seend for each product
    customer_dict = {}
    item_cost_dict = {}
    last_seen_customer_ids_dict = {}
    
    for row in csvRows(input_csv):
        product_id = row['Product ID']
        customer_id = row['Customer ID'] 
        item_cost = float(row['Item Cost'])
        if product_id in customer_dict:
            item_cost_dict[product_id] = item_cost_dict[product_id] + item_cost
            if last_seen_customer_ids_dict[product_id] != customer_id:
                customer_dict[product_id] = customer_dict[product_id]+1
        else:
            customer_dict[product_id] = 1
            item_cost_dict[product_id] = item_cost
            last_seen_customer_ids_dict[product_id] = customer_id

    # write output to file
    with open(output_csv, 'w') as writeFile:
        writer = csv.writer(writeFile)
        for key, value in customer_dict.items():
            writer.writerow([key, value, "{0:.2f}".format(item_cost_dict[key])])
    writeFile.close()

    
    
if __name__=='__main__':
    try:
        in_csv = sys.argv[1]
        out_csv = sys.argv[2]
        main(input_csv=in_csv, output_csv=out_csv)
    except IndexError: 
        print("Error: Please correct your command format[python HW1_streaming.py <INPUT_CSV> <OUTPUT_CSV>]")
    except IOError:
        print("Error: can\'t find file or read data")    
    
