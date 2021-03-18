#! /bin/bash
# Script to auto deploy code to qa branch and trigger jenkin.
# zsh: permission denied: ./deploy_dev_qa.sh > run chmod u+x ./deploy_dev_qa.sh
# The version will be increased automatically

echo -e "======== AUTO DEPLOYING QA============"
echo -e "1. Checking out develop..."
git checkout develop
git pull origin develop

qaLine9=`head -n 9 .env.qa | tail -1`
version=`echo $qaLine9 | sed "s/APP_VERSION_CODE=//g"`
echo -e "Current QA version is: $(($version))"
version=$((version + 2))
echo -e "New QA version is: $(($version))"

echo -e "2. Creating new release branch: release/v0.1-$(($version))..."
releaseBranch="release/v0.1-$(($version))"
git checkout -b $releaseBranch --force

echo -e "3. Changing app version..."
sed -i '' "s/APP_VERSION_CODE=$(($version - 3))/APP_VERSION_CODE=$(($version - 1))/g" .env.dev
sed -i '' "s/APP_VERSION_CODE=$(($version - 2))/APP_VERSION_CODE=$(($version))/g" .env.qa
sed -i '' "s/v0.1 - Build $(($version - 3))/v0.1 - Build $(($version - 1))/g" changelog.dev.txt
sed -i '' "s/v0.1 - Build $(($version - 2))/v0.1 - Build $(($version))/g" changelog.qa.txt

echo -e "4. Commiting release branch..."
git add .
git commit -m $releaseBranch

echo -e "5. Pushing code to release branch..."
# git push origin $releaseBranch

echo -e "6. Merging and pushing code to develop..."
git checkout develop
git merge -s recursive $releaseBranch -m "merged release to develop"
git push origin develop

echo -e "7. Merging qa to release..."
git checkout qa
git pull origin qa
git checkout $releaseBranch --force
git merge -s ours qa -m "merged qa to release"

echo -e "8. Pushing code to release branch..."
git push origin $releaseBranch

echo -e "9. Merging and pushing code to qa..."
git checkout qa
git merge -s recursive $releaseBranch -m "merged release to qa"
git push origin qa

echo -e "10. Checking out develop..."
git checkout develop

# echo -e "11. CALLING JENKIN..."
# # Android QA
# curl --location --request GET 'http://115.73.221.235:8080/job/mobilesc.Android_QA/build?token=pmcIPu29nyZ385lTQg0MsCLihBU7AWS6' \
# --header 'Authorization: Basic amVua2luczpzJF5KSlY8WzZoRWpjd0FM' \
# --header 'Cookie: JSESSIONID.41ae302e=node017rry4ie1x9femr5o6antph1r1827.node0' \
# --data-raw ''
# # iOS QA
# curl --location --request GET 'http://115.73.221.235:8080/job/mobilesc.IOS_QA/build?token=pB9PEXHsyi8MxWJGuUoKnQDOtTFZ6Lcq' \
# --header 'Authorization: Basic amVua2luczpzJF5KSlY8WzZoRWpjd0FM' \
# --header 'Cookie: JSESSIONID.41ae302e=node017rry4ie1x9femr5o6antph1r1827.node0' \
# --data-raw ''


echo -e "11. PROGRESS COMPLETED..."


