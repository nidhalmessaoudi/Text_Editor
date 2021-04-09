const appRoot = document.getElementById("app-root");

const textarea = document.querySelector(".text-input");

const model = document.querySelector(".model");

const overlay = document.querySelector(".overlay");

const closeModel = document.querySelector(".close-model");

const render = (markup, el) => {
    el.insertAdjacentHTML("beforeend", markup);
}

const setCursor = (char, abs) => {
    const position = textarea.value.lastIndexOf(char) + abs;

    textarea.setSelectionRange(position, position);
}

const generateMarkup = (str) => {
    const markup = str.replaceAll("&*", "<strong>")
        .replaceAll("*&", "</strong>")

        .replaceAll("/*", "<em>")
        .replaceAll("*/", "</em>")

        .replaceAll("@*", '<a href="')
        .replaceAll("*@", '">')
        .replaceAll("*!", '</a>')

        .replaceAll("%*", '<img src="')
        .replaceAll("*%", '"></img>')

        .replaceAll("'*", "<blockquote>")
        .replaceAll("*'", "</blockquote>")

        .replaceAll("#*","<h2>")
        .replaceAll("*#", "</h2>")

        .replaceAll("[*", "<ul>")
        .replaceAll("*]", "</ul>")

        .replaceAll("$*", "<li>")
        .replaceAll("*$", "</li>")

        .replaceAll("::", "<hr />")

        .replaceAll("(*", "")
        .replaceAll("*)", "")

    return markup;
}

appRoot.addEventListener("click", e => {

    const clicked = e.target.closest(".editor-icons");

    if (!clicked) return;

    if (clicked.classList.contains("bold")) {

        textarea.focus();

        textarea.value += "\n&**&";

        setCursor("&", -1);
    }

    if (clicked.classList.contains("italic")) {

        textarea.focus();

        textarea.value += "\n/**/";

        setCursor("/", -1);

    }

    if (clicked.classList.contains("link")) {

        textarea.focus();

        textarea.value += "\n@**@put linked text here(don't remove  symbols)*!";

        setCursor("@", -1);

    }

    if (clicked.classList.contains("img")) {

        textarea.focus();

        textarea.value += "\n%**%";

        setCursor("%", -1);

    }

    if (clicked.classList.contains("bq")) {

        textarea.focus();

        textarea.value += "\n'**'";

        setCursor("'", -1);

    }

    if (clicked.classList.contains("heading")) {

        textarea.focus();

        textarea.value += "\n#**#";

        setCursor("#", -1);

    }

    if (clicked.classList.contains("ul")) {

        textarea.focus();

        textarea.value += `\n[*
    $**$
*]`;

        setCursor("$", -1);

    }

    if (clicked.classList.contains("hr")) {

        textarea.focus();

        textarea.value += "\n::";

    }

    if (clicked.classList.contains("embedd-content")) {

        textarea.focus();

        textarea.value += "\n(**)";

        setCursor("(", 2);

    }

    if (clicked.classList.contains("markup")) {
        const markup = generateMarkup(textarea.value);
        render(markup, model);
        model.classList.remove("hidden");
        overlay.classList.remove("hidden");
    }

});

closeModel.addEventListener("click", () => {
    model.classList.add("hidden");
    overlay.classList.add("hidden");
});