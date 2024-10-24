//
//  RCTTangemSdk.m
//  POC_Tangem_RN
//
//  Created by Ali M. on 24/10/2024.
//

#import "RCTTangemSdk.h"

@implementation RCTTangemSdk

- (instancetype)init {
  self = [super init];
  if (self) {
    _tangemSdk = [[TangemSdk alloc] init];
  }
  return self;
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeTangemSdkSpecJSI>(params);
}

RCT_EXPORT_MODULE(TangemSdk);

- (void)scan:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
  [self.tangemSdk scanWithSuccess:^(NSString *result) {
    resolve(result);
  } failure:^(NSError *error) {
    reject(@"SCAN_FAILED", @"Scan failed", error);
  }];
}

@end
