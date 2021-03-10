#! /bin/bash
# Script to auto deploy code to dev branch and trigger jenkin.
# zsh: permission denied: ./deploy_dev_qa.sh > run chmod u+x ./deploy_dev_qa.sh
# The version will be increased automatically

echo -e "======== AUTO DEPLOYING DEV============"
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
git push origin $releaseBranch

echo -e "6. Merging and pushing code to develop..."
git checkout develop
git merge -s recursive $releaseBranch -m "merged release to develop"
git push origin develop

echo -e "7. Merging dev to release..."
git checkout dev
git pull origin dev
git checkout $releaseBranch --force
git merge -s ours dev -m "merged dev to release"

echo -e "8. Pushing code to release branch..."
git push origin $releaseBranch

echo -e "9. Merging and pushing code to dev..."
git checkout dev
git merge -s recursive $releaseBranch -m "merged release to dev"
git push origin dev

echo -e "10. Checking out develop..."
git checkout develop

# echo -e "11. CALLING JENKIN..."
# # Android Dev
# curl --location --request GET 'http://115.73.221.235:8080/job/mobilesc.Android_DEV/build?token=lUWvjeEBri0dctpa6OmPSHNJw5Z3s1F7' \
# --header 'Authorization: Basic amVua2luczpzJF5KSlY8WzZoRWpjd0FM' \
# --header 'Cookie: JSESSIONID.41ae302e=node017rry4ie1x9femr5o6antph1r1827.node0' \
# --data-raw ''
# # iOS Dev
# curl --location --request GET 'http://115.73.221.235:8080/job/mobilesc.IOS_DEV/build?token=INw3aLp6GKDz4Yxt0BZRU1kovQS9T5Xu' \
# --header 'Authorization: Basic amVua2luczpzJF5KSlY8WzZoRWpjd0FM' \
# --header 'Cookie: JSESSIONID.41ae302e=node017rry4ie1x9femr5o6antph1r1827.node0' \
# --data-raw ''

echo -e "11. PROGRESS COMPLETED..."


