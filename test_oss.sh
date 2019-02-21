source .version

# rm -f ./ossutil_output/*

# ./ossutilmac64 --config-file .ossutilconfig cp -fr dist/ oss://listen-dev-zhujiali/crm/$VERSION

total=0
# 错误校验
for file in ./ossutil_output/*
do
  num_of_lines= cat $file | wc -l
  total=$((total+num_of_lines))
done

min=0
if [ "$total" -gt "$min" ]; then
  echo Hey that\'s a large number.
fi

echo $total
exit 1
