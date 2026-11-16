# مجلد `native/` — إعداد بناء Android/EAS

> هذا المجلد **توثيق جاهز للنسخ** إلى مشروع React Native + Expo، وليس مشروعًا يعمل في هذه البيئة.

هذه البيئة (بيئة توليد التطبيقات على الويب) تبني مخرجًا واحدًا على الويب (`dist/index.html`)،
وليس لديها Android SDK ولا JDK ولا Gradle، لذلك لا يمكن تنفيذ `expo prebuild` أو
`gradlew assembleDebug` فعليًا هنا. ما يلي هو الإعداد الكامل الذي يُنسخ كما هو عند نقل المشروع
إلى مشروع Expo.

## خطوات النقل إلى React Native (بترتيب التنفيذ)

```bash
# 1) إنشاء المشروع
npx create-expo-app@latest tarmim-islam --template blank-typescript
cd tarmim-islam

# 2) المكتبات المطلوبة
npx expo install expo-router expo-font expo-clipboard expo-sharing \
  expo-constants expo-linking expo-status-bar react-native-safe-area-context \
  react-native-gesture-handler react-native-reanimated react-native-screens \
  @react-native-async-storage/async-storage react-native-svg
npm install lucide-react-native

# 3) الخطوط (أضِف الملفات إلى assets/fonts ثم سجّلها في expo-font)
npx expo install expo-font
# assets/fonts/Amiri-Regular.ttf  Amiri-Bold.ttf
# assets/fonts/Tajawal-Regular.ttf Tajawal-Bold.ttf Tajawal-Medium.ttf
# assets/fonts/ScheherazadeNew-Regular.ttf ScheherazadeNew-Bold.ttf

# 4) إعداد app.json (انسخ native/app.json) ثم eas.json (انسخ native/eas.json)

# 5) توليد مشروع Android الأصلي والاحتفاظ به
npx expo prebuild --platform android --clean
```

## بناء APK محليًا (يتطلب JDK 17 + Android SDK + Gradle)

```bash
cd android
./gradlew assembleDebug          # Windows: gradlew.bat assembleDebug
./gradlew assembleRelease        # بعد إعداد مفتاح التوقيع في android/gradle.properties
```

المخرجات:

- `android/app/build/outputs/apk/debug/app-debug.apk`
- `android/app/build/outputs/apk/release/app-release.apk`

## بناء APK عبر EAS (بديل بدون بيئة بناء محلية)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview   # ينتج APK قابل للتثبيت
```

## الاختلافات بين تشغيل Expo Go وبناء APK

| النقطة | Expo Go | APK مستقل |
| --- | --- | --- |
| الحاوية | تطبيق تجريبي يحتوي مكتبات محددة | تطبيق مستقل بحزمة `com.tarmimislam.app` |
| المكتبات الأصلية | محدودة بما داخل Expo Go | كل ما في `package.json` بعد `prebuild` |
| الخطوط | تُحمَّل في وقت التشغيل | مُدمجة في الملف النهائي |
| التوزيع | للتجربة فقط | تثبيت مباشر / متاجر |
| توقيع | لا يلزم | مطلوب للـ release |
