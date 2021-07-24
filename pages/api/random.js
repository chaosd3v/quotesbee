// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json({
        "anime":"Naruto",
        "quote":"Hard work is worthless for those that don’t believe in themselves.",
        "character":"Naruto Uzumaki"
     })
}
