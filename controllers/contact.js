exports.getContact = (req, res, next) => {
    res.render("contact", {
      pageTitle: "Contact us",
      path: "/contact"
    })
}

exports.postContact = (req, res, next) => {
    console.log(req.body);
    res.redirect("/success");
  }

exports.getSuccess = (req, res, next) => {
    res.render("success", {
        pageTitle: "Success",
        path: "/success"
    })
  }