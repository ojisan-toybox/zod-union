import { z } from "zod";
const leftSchema = z.object({
  id: z.number(),
  name: z.string(),
});

type Left = z.infer<typeof leftSchema>;

const rightSchema = z.object({
  pid: z.number(),
  user_id: z.number(),
});

type Right = z.infer<typeof rightSchema>;

const schema = z.union([leftSchema, rightSchema]);

const validate = (data: unknown) => {
  return schema.safeParse(data);
};

console.log(validate(3));
console.log(validate({ id: 2, name: "hoge" }));

const parsedData = validate({ id: 2, name: "hoge" });
if (parsedData.success) {
  if ("id" in parsedData.data) {
    const left: Left = parsedData.data;
  } else if ("pid" in parsedData.data) {
    const right: Right = parsedData.data;
  }
}
