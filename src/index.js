import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import App from "./App";
import {IntlProvider} from "react-intl";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <IntlProvider locale={"en"}>
        <App/>
    </IntlProvider>
);
