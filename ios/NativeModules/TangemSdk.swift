//
//  TangemSdk.swift
//  POC_Tangem_RN
//
//  Created by Ali M. on 24/10/2024.
//

import Foundation
import TangemSdk

@objc class TangemSdk: NSObject {
  
  let sdk = TangemProvider.getTangemSdk()
  
  @objc func scan(success: @escaping (String) -> Void, failure: @escaping (String) -> Void) {
    
    Task {
      
      let startSessionResult = await sdk.startSessionAsync(cardId: nil, accessCode: "141414")
      
      guard startSessionResult.success, let session = startSessionResult.value else {
        failure("Start Session failed: \(startSessionResult.error!)")
        return
      }
      
      let scan = ScanTask()
      let scanResult = await scan.runAsync(in: session)
      
      guard scanResult.success, let card = scanResult.value else {
        failure("ScanTask failed: \(scanResult.error!)")
        session.stop()
        return
      }
      
      print(card.json)
      
      for wallet in card.wallets {
        let curve = wallet.curve.rawValue
        let pubKey = wallet.publicKey.base58EncodedString
        print("Wallet \(curve) | \(pubKey)")
      }
      
      session.stop()

      success(card.json)
      
    }
    
  }
  
}
