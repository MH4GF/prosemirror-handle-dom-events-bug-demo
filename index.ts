import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { exampleSetup } from "prosemirror-example-setup";

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks,
});

const myPlugin = new Plugin({
  props: {
    // Type '{ mousedown: (_view: EditorView, _event: MouseEvent) => true; }' is not assignable to type '{ [x: string]: ((view: EditorView, event: Event) => boolean | void) | undefined; fullscreenchange?: ((view: EditorView, event: Event) => boolean | void) | undefined; ... 98 more ...; wheel?: ((view: EditorView, event: WheelEvent) => boolean | void) | undefined; }'.
    //  Property 'mousedown' is incompatible with index signature.
    //  Type '(_view: EditorView, _event: MouseEvent) => true' is not assignable to type '(view: EditorView, event: Event) => boolean | void'.
    //    Types of parameters '_event' and 'event' are incompatible.
    //      Type 'Event' is missing the following properties from type 'MouseEvent': altKey, button, buttons, clientX, and 21 more.ts(2322)
    handleDOMEvents: {
      mousedown: (_view, _event) => {
        return true;
      },
    },
  },
});

// @ts-ignore
window.view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(
      document.querySelector("#content")!
    ),
    plugins: [...exampleSetup({ schema: mySchema }), myPlugin],
  }),
});
