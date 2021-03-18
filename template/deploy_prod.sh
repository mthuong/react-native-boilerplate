#! /bin/bash
# Script to auto deploy code to master branch.
# zsh: permission denied: ./deploy_prod.sh > run chmod u+x ./deploy_prod.sh
# The version will be increased automatically

echo -e "======== AUTO DEPLOYING PRODUCTION ============"
echo -e "1. Checking out develop..."
git checkout develop
git pull origin develop
echo -n "Please enter the new PROD build version: " 
read version

prodLine9=`head -n 9 .env | tail -1`
currentVersion=`echo $prodLine9 | sed "s/APP_VERSION_CODE=//g"`
echo -e "Current PROD version is: $(($currentVersion))"

echo -e "2. Creating new release branch: release/v0.1-$(($version))..."
releaseBranch="release/v0.1-$(($version))"
git checkout -b $releaseBranch --force

echo -e "3. Changing app version..."
sed -i '' "s/APP_VERSION_CODE=$(($currentVersion))/APP_VERSION_CODE=$(($version))/g" .env
sed -i '' "s/v0.1 - Build $(($currentVersion))/v0.1 - Build $(($version))/g" changelog.production.txt

echo -e "4. Commiting release branch..."
git add .
git commit -m $releaseBranch

echo -e "5. Pushing code to release branch..."
git push origin $releaseBranch

echo -e "6. Merging and pushing code to develop..."
git checkout develop
git merge -s recursive $releaseBranch -m "merged release to develop"
git push origin develop

echo -e "7. Merging master to release..."
git checkout master
git pull origin master
git checkout $releaseBranch --force
git merge -s ours master -m "merged master to release"

echo -e "8. Pushing code to release branch..."
git push origin $releaseBranch

echo -e "9. Merging and pushing code to master..."
git checkout master
git merge -s recursive $releaseBranch -m "merged release to master"
git push origin master

echo -e "10. Create tag..."
git tag -a "v0.1-$version" -m "v0.1-$version"
git push origin "v0.1-$version"

echo -e "11. Checking out develop..."
git checkout develop

echo -e "12. Cleanup release branch..."
git branch -D $releaseBranch
git push -d origin $releaseBranch

echo -e "13. RELEASE PRODUCTION COMPLETED..."
