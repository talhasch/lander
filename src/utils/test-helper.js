import React from 'react';
import {addLocaleData, IntlProvider} from "react-intl";
import flattenMessages from "./flatten-messages";
import messages from "../locales/index";

import en from "react-intl/locale-data/en";

addLocaleData([...en]);

export default function wrapWithIntl(component) {
  let locale = 'en-US';

  return <IntlProvider locale={locale} messages={flattenMessages(messages[locale])}>
    {component}
  </IntlProvider>
}