//
//  Dynamic.swift
//  CarOwners
//
//  Created by User on 26.05.23.
//

import Foundation
import Lottie
import react_native_lottie_splash_screen
import UIKit

@objc class Dynamic: NSObject {
  @objc func createAnimationView(rootView: UIView, lottieName: String) -> LottieAnimationView {
    let animationView = LottieAnimationView(name: lottieName)
    animationView.frame = rootView.frame
    animationView.center = rootView.center
    animationView.backgroundColor = UIColor.white
    return animationView
  }

  @objc func play(animationView: LottieAnimationView) {
    animationView.play(
      fromProgress: 0.0, toProgress: 1.0, loopMode: LottieLoopMode.loop,
      completion: { _ in
        RNSplashScreen.setAnimationFinished(true)
      }
    )
  }
}
