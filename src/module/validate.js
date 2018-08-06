import VeeValidate, { Validator } from "vee-validate";
import moment from 'moment'

// カスタムメッセージを定義
// node_modules/vee-validate/dist/locale/ja.js を上書きする
const validMessage = { locale: 'ja', dictionary: {
  ja: {
    custom: {
      // 項目別メッセージ定義
      requestDate: {
        regex: n => n + "：日付形式(YYYY/MM/DD)で入力してください。",
        date_format: n => n + "：日付に誤りがあります。",
      },
      selectList: {
        allNotEmpty: n => "１件以上選択してください。",
      }
    },
    // バリデーションルール別メッセージ定義
    messages: {
      email: n => n + "：有効なメールアドレスではありません",
      max: (n, e) => n + "：" + e[0] + "文字以内で入力してください。",
      maxComma: (n, e) => n + "：" + e[0] + "文字以内で入力してください。",
      min: (n, e) => n + "：" + e[0] + "文字以上でなければなりません",
      numeric: n => n + "：半角数字で入力してください。",
      numericComma: n => n + "：半角数字で入力してください。",
      alpha_num: n => n + "：半角英数字で入力してください。",
      required: n => n + "：必ず入力してください", 
      date_format: (n, e) => n + "：日付に誤りがあります。",
      fullWidth: n => n + "：全角文字で入力してください。",
      numericHyphen: n => n + "：半角数字と-(ハイフン)のみで入力してください。",
      allNotEmpty: n => n + "：１件以上選択してください。",
      fromTo: (n,e) => n + "：" + e[0] + "は" + e[1] + "より後の日付を指定してください。",
      sameValue: n => n + "は同一でなければなりません",
    }
  }
}}

// --------------------
//カスタムバリデーション
// --------------------
//全角文字
Validator.extend("fullWidth", {
  validate: value => {
    for (var i = 0; i < value.length; ++i) {
      var c = value.charCodeAt(i);
      if ((0x20 <= c && c < 0x7f) || (c >= 0xff61 && c <= 0xff9f)) {
        return false;
      }
    }
    return true;
  },
});
//半角数字と-（ハイフン）
Validator.extend("numericHyphen", {
  validate: value => {
    if (value.match(/[^0-9\-]+/)) {
      return false;
    }
    return true;
  },
});
//カンマを除いて半角数字チェック
Validator.extend("numericComma", {
  validate: value => {
    if (value.toString().replace(/,/g, '').match(/[^0-9]+/)) {
      return false;
    }
    return true;
  },
});
//カンマを除いてmaxLengthチェック
Validator.extend("maxComma", {
  validate: (value, max) => {
    if (value.toString().replace(/,/g, '').length > Number(max)) {
      return false;
    }
    return true;
  },
});
// 一つ以上がチェックされているか
Validator.extend("allNotEmpty", {
  validate: valueList => {
    if (valueList.length == 0 ) {
      return false;
    }
    return true;
  },
});

/**
 * どちらか一方のみ入力されていること
 * param1: item1
 * param2: item2
 */
Validator.extend("enterEither", {
  validate: values => {
    if ((values.item1 && values.item2) ||
        (!values.item1 && !values.item2 )  ) {
      return false;
    }
    return true;
  },
});

/**
 * 2つの値が一致すること
 * param1: item1
 * param2: item2
 */
Validator.extend("sameValue", {
  validate: values => {
    if (values.item1 !== values.item2) {
      return false;
    }
    return true;
  },
});

// 日付大小チェック
Validator.extend("fromTo", {
  validate: values => {
    if (moment(values.to).isAfter(values.from)) {
      return false;
    }
    return true;
  },
});

export default {
  validMessage
};
