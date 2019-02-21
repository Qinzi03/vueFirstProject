#!/bin/sh
VERSION=$1

rm -f ./ossutil_output/*

./ossutil64 --config-file .ossutilconfig cp -fr dist/ oss://listen-dev-zhujiali/crm/$VERSION

total=0

for file in ./ossutil_output/*
do
  num_of_lines= cat $file | wc -l
  total=$((total+num_of_lines))
done

min=0

if [ "$total" -gt "$min" ]; then
  echo "oss上传失败"
  exit 1
fi

