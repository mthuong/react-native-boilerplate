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
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios add_devices
```
fastlane ios add_devices
```

### ios generate_certs
```
fastlane ios generate_certs
```
Generate required certs
### ios renew_profiles
```
fastlane ios renew_profiles
```
Renew provisionings
### ios sync_certs
```
fastlane ios sync_certs
```
Sync certs to local environment
### ios adhoc_dev
```
fastlane ios adhoc_dev
```
AdHoc DEV
### ios adhoc_qa
```
fastlane ios adhoc_qa
```
AdHoc QA
### ios adhoc_production
```
fastlane ios adhoc_production
```
AdHoc PRODUCTION
### ios development
```
fastlane ios development
```
Push a new DEV build to TestFlight
### ios qa
```
fastlane ios qa
```
Push a new QA build to TestFlight
### ios production
```
fastlane ios production
```
Push a new PRODUCTION build to TestFlight

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
