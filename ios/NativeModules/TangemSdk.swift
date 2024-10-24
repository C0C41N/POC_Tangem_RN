//
//  TangemSdk.swift
//  POC_Tangem_RN
//
//  Created by Ali M. on 24/10/2024.
//

import Foundation

@objc class TangemSdk: NSObject {

    @objc func scan(success: @escaping (String) -> Void, failure: @escaping (NSError) -> Void) {

        let error = NSError(domain: "TangemSdk", code: 500, userInfo: [NSLocalizedDescriptionKey: "Scan failed"])

        let isSuccess = true

        if isSuccess {
            success("Scan successful")
        } else {
            failure(error)
        }

    }

}
