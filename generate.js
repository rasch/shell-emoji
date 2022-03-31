import https from "https"

const emojiData =
  "https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json"

// compose :: ((y -> z), (x -> y), ..., (a -> b)) -> a -> z
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)

// sortBy :: String -> [{k: v}] -> [{k: v}]
const sortBy = s => a => a.sort((x, y) => x[s] - y[s])

// map :: (a -> b) -> [a] -> [b]
const map = f => a => a.map(f)

// join :: String -> Array -> String
const join = s => a => a.join(s)

// split :: String -> String -> [String]
const split = ss => s => s.split(ss)

// codepointsToHex :: [String] -> String
const codepointsToHex = map(s => `0x${s}`)

// replace :: RegExp|String -> String -> String -> String
const replace = a => b => c => c.replace(a, b)

// emoji :: [String] -> String
const emoji = a => String.fromCodePoint(...a)

// emojiFromCodepoints :: String -> String
const emojiFromCodepoints = compose(emoji, codepointsToHex, split('-'))

// nameToShellVariable :: String -> String
const nameToShellVariable = compose(
  replace(/[^a-zA-Z0-9_]/g)('_'),
  replace('-1')('minus_1'),
  replace('+1')('plus_1')
)

// transform :: {unified: String, short_name: String} => String
const transform = data =>
  `e_${nameToShellVariable(data.short_name)}='${emojiFromCodepoints(data.unified)}'`

https
  .get(emojiData, res => {
    let data = ""
    res.on("data", d => (data += d))
    res.on("end", () =>
      compose(
        console.log,
        join('\n'),
        map(transform),
        sortBy('sort_order'),
        JSON.parse
      )(data)
    )
  })
  .on("error", e => console.error(e))
