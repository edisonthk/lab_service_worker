# Service Worker サンプル - オフライン

service workerはセキュリティーの要因で、http://localhost もしくは https のみ機能します。fileプロトコールでは機能しません。

```
cd sample_offline
php -S 127.0.0.1:8000
open http://localhost:8000
```

### [メモ] URLスラッシュ問題

service worker のスコープ設定では、URLスラッシュ問題がありまして、通常では最後のスラッシュを削りますが、service workerのスコープ設定では最後のスラッシュを削ってはいけません。つまり、 `{scope: '/sample_offline'}` が設定できません。 そのため、URLも含めて `/sample_offline/` に合わせて調整する必要があります。

https://developers.google.com/web/ilt/pwa/introduction-to-service-worker#registration_and_scope