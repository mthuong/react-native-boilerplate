fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android adhoc_development
```
fastlane android adhoc_development
```
Build Dev
### android adhoc_qa
```
fastlane android adhoc_qa
```
Build QA
### android adhoc_production
```
fastlane android adhoc_production
```
Build PRODUCTION
### android development
```
fastlane android development
```
Submit a new DEV Build to Firebase App Distribution
### android qa
```
fastlane android qa
```
Submit a new QA Build to Firebase App Distribution
### android production
```
fastlane android production
```
Submit a new PRODUCTION Build to Firebase App Distribution
### android deploy
```
fastlane android deploy
```
Deploy a new version to the Google Play
### android upload_einstore
```
fastlane android upload_einstore
```
Einstore deployment

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
