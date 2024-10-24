//
//  RCTTangemSdk.h
//  POC_Tangem_RN
//
//  Created by Ali M. on 24/10/2024.
//

#import "NativeModules/NativeModules.h"
#import "POC_Tangem_RN-Swift.h"
#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTTangemSdk : NSObject<NativeTangemSdkSpec>
@property (nonatomic, strong) TangemSdk *tangemSdk;
@end

NS_ASSUME_NONNULL_END
