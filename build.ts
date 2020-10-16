import * as gulp from "gulp";
import { Service, project } from "@wasm/studio-utils";

gulp.task("build", async () => {
  const options = { lto: true, opt_level: 's', debug: true };
  const data = await Service.compileFile(project.getFile("src/lib.rs"), "rust", "wasm", options);
  const outWasm = project.newFile("target/wasm32-unknown-unknown/release/wasm_rust.wasm", "wasm", true);
  outWasm.setData(data);
});

gulp.task("default", gulp.parallel("build"));
