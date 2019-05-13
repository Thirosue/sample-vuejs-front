rm -rf sample-vuejs-front
git clone https://github.com/Thirosue/sample-vuejs-front.git

cd ~/sample-vuejs-front

# endpoint replace for alb cli
ENDPOINT=`aws elbv2 describe-load-balancers --name vue-sample-front-alb | jq -r '.LoadBalancers[].DNSName'`
sed -i -e "s/localhost:8080/$ENDPOINT/" cypress.json

# exec e2e
yarn
yarn cypress run -b chrome
mkdir cypress/report
yarn --silent mochawesome-merge > cypress/report/mochawesome.json
yarn marge cypress/report/mochawesome.json -o cypress/report

# s3 sync
aws s3 cp cypress/report s3://vue-sample-e2e-results/`date "+%Y%m%d%H%M%S"`/ --recursive