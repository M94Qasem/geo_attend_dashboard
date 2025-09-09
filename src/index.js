import React from "react";
import ReactDOM from "react-dom";
// لقد قمت بتغيير HashRouter إلى BrowserRouter لأنه الأكثر شيوعاً وتوافقاً مع معايير الويب الحديثة.
// إذا واجهت مشاكل في النشر لاحقاً، يمكننا إعادته إلى HashRouter بسهولة.
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts (الهياكل الأساسية التي سنحتفظ بها)
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts (تم حذف استيراد الصفحات المؤرشفة)


// ملاحظة: الكود يستخدم ReactDOM.render وهو الأسلوب القديم في React 17.
// إذا كان مشروعك يستخدم React 18، قد تحتاج إلى تحديث هذا الجزء لاحقاً، لكنه سيعمل الآن.
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* المسارات الأساسية التي سنستخدمها في المشروع */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      
      {/* التوجيه الرئيسي: أي زيارة للموقع سيتم تحويلها مباشرة إلى لوحة التحكم */}
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
