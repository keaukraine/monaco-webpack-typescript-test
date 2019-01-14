import * as Monaco from "monaco-editor";

function createEditor(container: HTMLElement, value: string): Monaco.editor.IStandaloneCodeEditor {
    // We need to instruct the editor how we named the bundles that contain the web workers.
    // Please note that this alters global `window` object so it may conflict with another
    // Monaco instances configured for other languages.
    // https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-esm.md
    (window as any).MonacoEnvironment = {
        getWorkerUrl(moduleId: string, label: string) {
            if (label === "javascript") {
                return "./ts.worker.bundle.js";
            }
            return "./editor.worker.bundle.js";
        }
    };

    const editor = Monaco.editor.create(
        container,
        {
            theme: "vs-dark",
            automaticLayout: true,
            language: "javascript",
            value
        }
    );

    editor.focus();

    return editor;
}

const container = document.getElementById("divEditor");
if (container) {
    const editor = createEditor(container, "// Some JS code\nconst a = 1;");
}
