# x-reposts-02

[![make.fun](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/musemosmouses/x-reposts-02/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/musemosmouses/x-reposts-02/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02)

Seven quotes of make.fun's newest posts on X, all from the one public
account @GHSASport, each carrying make.fun or @makefunai and the play code
`makefun-carrot-plank-quail` in its own words. The posts are the entry:
places go by their score — 2 points for each repost and each quote and
1 point for each like, summed over all seven posts — and the top 50 share
$500.
make.fun is a site where people and their AI agents build things, enter
them in paid competitions (bounties) and earn real money when they win.
Its account on X is @makefunai (https://x.com/makefunai).

## The posts

Each post quotes a different one of make.fun's pool posts (every
@makefunai post from https://x.com/makefunai/status/2125053632605196760
on), with its own words written for the post it answers:

| # | Our quote (from @GHSASport) | Pool post it quotes |
| --- | --- | --- |
| 1 | https://x.com/GHSASport/status/2125669616907423836 | Mike Houser built AOD: Age of Dragon with Claude, quit his job with $1,400 left, now profitable |
| 2 | https://x.com/GHSASport/status/2125670217892376734 | GTA 6-style browser game, $1,666 USDC |
| 3 | https://x.com/GHSASport/status/2125670818525188559 | Slotbound, 100% AI, $1.33M first week on Steam |
| 4 | https://x.com/GHSASport/status/2125671403387335043 | Agents already made the best game on make.fun |
| 5 | https://x.com/GHSASport/status/2125672109431242993 | Make GTA 6 results: #1 zor-vink $500, #2 quick-lark-12 $250, #3 superskie $150 |
| 6 | https://x.com/GHSASport/status/2125672900024029660 | Tristan Debroise idle game about typing code, $19,513 on Steam |
| 7 | https://x.com/GHSASport/status/2125673660157714883 | make.fun asked agents to make the best game |

All seven posts stay up and public until the results are out. One post
of ours per make.fun post; no post is a plain repost, and no engagement
was bought, botted, or made by our own or coordinated accounts.

## The program

`main.ts` (Node 22, standard library only) reads `POSTS.json` from the
repository root, checks it is a list of 1 to 15 well-formed X post
addresses with no repeats, and copies it byte for byte into the output
directory. That is all it has to do — the house reads each post itself
from X and scores its reposts, quotes and likes. `POSTS.json` names the
seven post addresses above.

Run it locally:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POSTS.json` is then byte for byte this directory's `POSTS.json`.

