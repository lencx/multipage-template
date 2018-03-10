#!/bin/bash
# echo "\033[40;35;1m src/model: \033[40;35;1m"
echo "**********************************"
for i in `ls src/model`; do
    printf "\033[40;35;1m[%s Model]\t\033[32;49;0m" ${i}
done;
echo "*"
echo "**********************************"
# echo $2

# sed -n '13c sss' package.json

# sed -ig 's/dev*/dev:'${2}'/g' package.json
# sed -ig 's/dev/dev:'${2}'/g' package.json

#  -ige 's/build@/build:'${2}'/g'
# sed -i "s/build@/build:${2}/g" a.txt > a.tmp
# sed -ig 's/build@/build:sas/' package.json

# yarn dev:a