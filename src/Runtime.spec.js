import Runtime from "./Runtime.js";

export default test => {
  test.case("ctor: .virtuals", async assert => {
    const runtime = await Runtime.new({
      once: true,
      virtuals: {
        "/Test.svelte": "<script>export let foo</script>{foo}",
        "/test.json": "{ \"foo\": \"bar\" }",
      },
    });
    const svelte = await runtime.load("/Test.svelte");
    assert(svelte.source.includes("generated by Svelte")).true();
    runtime.reuse();
    const json = await runtime.load("/test.json");
    assert(json.source).equals("export default { \"foo\": \"bar\" }");
  });
};
