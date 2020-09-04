$(document).ready(function (e) {
    function o(e) {
        for (var o = 0; o < e.length; o++)
            !(function (o) {
                var a = e[o].code,
                    s = e[o].thumbnail,
                    n = new Image();
                $(".photo_selection").append("<li data-value=" + a + "></li>"),
                    n.addEventListener(
                        "load",
                        function () {
                            t(a, s);
                        },
                        !1
                    ),
                    n.addEventListener("error", function () {
                    }, !1),
                    (n.src = s);
            })(o);
    }

    function t(e, o) {
        $('.photo_selection li[data-value="' + e + '"]').attr(
            "style",
            "background:url(" + o + "); background-size: contain;"
        );
    }

    function a() {
        var e = selectedPosts.length - 1,
            o = Math.ceil(package
        / selectedPosts.length);
        (bg = $(
            ".box-form .select-box ul li[data-value=" + selectedPosts[e] + "]"
        ).attr("style")),
            (value = $(
                ".box-form .select-box ul li[data-value=" +
                selectedPosts[e] +
                "]"
            ).data("value")),
            (temp =
                '<div class="row"> <div class="photo" data-value="' +
                value +
                '"> <div class="img" style="' +
                bg +
                '"></div> </div> <div class="remove"></div> <div class="package">' +
                o +
                "</div> </div>"),
            $(".selected-photos-summary").append(temp),
            n();
    }

    function s(e) {
        (rm = selectedPosts.indexOf(e)),
            selectedPosts.splice(rm, 1),
            $(".box-form .select-box ul li[data-value=" + e + "]").removeClass(
                "selected"
            ),
            $(".selected-photos-summary .row .photo[data-value=" + e + "]")
                .parent()
                .remove(),
            n();
    }

    function n() {
        if (
            ($(".photo_selection")
                .parents()
                .find("input[name=selected_photos]")
                .val(selectedPosts.join(",")),
                checkout.updateSummaryItems(),
            selectedPosts.length > 0)
        ) {
            $(".title.selected-photos").show();
            try {
                var e = $("input[name=package]").val();
                upsale.update(e), checkout.showSummary();
            } catch (e) {
                console.log(e);
            }
        } else {
            $(".title.selected-photos").hide();
            try {
                upsale.revert(), upsale.hideCard(), checkout.hideSummary();
            } catch (e) {
                console.log(e);
            }
        }
    }

    function c() {
        $(".photo_selection")
            .parents()
            .find("input[name=selected_photos]")
            .val(""),
            $(".photo_selection li").remove(),
            (selectedPosts = []),
            $(".title.selected-photos").hide(),
            $(".selected-photos-summary").html(""),
            $(".box-form .select-box ul li").removeClass("selected");
        try {
            upsale.revert(),
                upsale.hideCard(),
                checkout.hideSummary(),
                checkout.hideTargeting(),
                checkout.setDefaultTargeting();
        } catch (e) {
            console.log(e);
        }
    }

    function r(e) {
        $("html,body").animate({scrollTop: $(e).offset().top - 20});
    }

    (username = null),
        (posts = null),
        (selectedPosts = []),
        (email = null),
        (repeat_email = null),
        (password = null),
    $(".dropdown").length &&
    ($(".dropdown.package").dropdown(),
        $(
            ".box-form .ui.dropdown .menu, .box-form .ui.dropdown .text,  .box-form .ui.dropdown i"
        ).css("opacity", "1"),
        $(".dropdown").each(function (e, o) {
            var t = $(this);
            $(this)
                .find(".menu .item")
                .each(function (e, o) {
                    $(this).data("selected") &&
                    t.dropdown("set selected", $(this).data("value"));
                });
        })),
        $(".choose-account-single").on("submit", function (e) {
            e.preventDefault(),
                (username = $(this)
                    .find("input[name=username]")
                    .val()),
                (email = $(this)
                    .find("#checkout-trial-email-input")
                    .val());
            var t = $(this).find("button");
            is_trial && !email
                ? $(".choose-account-1")
                    .find(".toast.error")
                    .show()
                    .find(".d")
                    .html("Please enter your e-mail.")
                : username
                ? (btn_add_loader(t),
                        $.get('https://www.instagram.com/' + username + '/?__a=1', function (e) {
                            // console.log(e);
                            $.post('/user/media/' + username, {data: e}, function (e) {
                                // console.log(e);
                                if ((btn_remove_loader(t), e.success))
                                    if (e.is_private)
                                        $(".choose-account-1")
                                            .find(".toast.error")
                                            .show()
                                            .find(".d")
                                            .html(
                                                "Your account is set to private. Please set it to public."
                                            );
                                    else {
                                        $(".choose-account-1")
                                            .find(".toast.error")
                                            .hide(),
                                            (package = $("input[name=package]").val());
                                        try {
                                            upsale.revert(),
                                                checkout.recalculateDelay(package);
                                        } catch (e) {
                                            console.log(e);
                                        }
                                        $(
                                            ".choose-account-2 .user-details .photo img"
                                        ).attr("src", e.profile_picture),
                                            $(
                                                ".choose-account-2 .user-details .info .username"
                                            ).html(username),
                                            (price = getPackage(package, !1).price),
                                            (price =
                                                "Free" == price ? "Free" : "$" + price),
                                            $(
                                                ".choose-account-2 .user-details .info .likes"
                                            ).html(
                                                package +
                                                " followers <span>" +
                                                price +
                                                "</span>"
                                            ),
                                            $(
                                                ".choose-account-2 .user-details .info .likes"
                                            ).attr("data-value", package),
                                        e.has_next_page &&
                                        ($(".choose-account-2 .load-more").attr(
                                            "data-next",
                                            e.max_id
                                        ),
                                            $(".choose-account-2 .load-more").show()),
                                            $("#payment .price").html(price),
                                            $(".choose-account-1").hide(),
                                            $(".choose-account-2").show(),
                                            $(".box-form#payment").removeClass(
                                                "disabled"
                                            ),
                                            o(e.media);
                                    }
                                else
                                    $(".choose-account-1")
                                        .find(".toast.error")
                                        .show()
                                        .find(".d")
                                        .html(e.msg);
                            })
                        }).fail(function () {
                            // alert('woops'); // or whatever
                            $(".choose-account-1")
                                .find(".toast.error")
                                .show()
                                .find(".d")
                                .html(
                                    "Username not found, please check the username again!"
                                );

                            btn_remove_loader(t);
                        })
                    // ,
                    // $.get("/user/media/" + username, function (e) {
                    //     console.log(e);
                    //     // e = JSON.parse(e);
                    //     if ((btn_remove_loader(t), e.success))
                    //         if (e.is_private)
                    //             $(".choose-account-1")
                    //                 .find(".toast.error")
                    //                 .show()
                    //                 .find(".d")
                    //                 .html(
                    //                     "Your account is set to private. Please set it to public."
                    //                 );
                    //         else {
                    //             $(".choose-account-1")
                    //                 .find(".toast.error")
                    //                 .hide(),
                    //                 (package = $("input[name=package]").val());
                    //             try {
                    //                 upsale.revert(),
                    //                     checkout.recalculateDelay(package);
                    //             } catch (e) {
                    //                 console.log(e);
                    //             }
                    //             $(
                    //                 ".choose-account-2 .user-details .photo img"
                    //             ).attr("src", e.profile_picture),
                    //                 $(
                    //                     ".choose-account-2 .user-details .info .username"
                    //                 ).html(username),
                    //                 (price = getPackage(package, !1).price),
                    //                 (price =
                    //                     "Free" == price ? "Free" : "$" + price),
                    //                 $(
                    //                     ".choose-account-2 .user-details .info .likes"
                    //                 ).html(
                    //                     package +
                    //                     " followers <span>" +
                    //                     price +
                    //                     "</span>"
                    //                 ),
                    //                 $(
                    //                     ".choose-account-2 .user-details .info .likes"
                    //                 ).attr("data-value", package),
                    //                 e.has_next_page &&
                    //                 ($(".choose-account-2 .load-more").attr(
                    //                     "data-next",
                    //                     e.max_id
                    //                 ),
                    //                     $(".choose-account-2 .load-more").show()),
                    //                 $("#payment .price").html(price),
                    //                 $(".choose-account-1").hide(),
                    //                 $(".choose-account-2").show(),
                    //                 $(".box-form#payment").removeClass(
                    //                     "disabled"
                    //                 ),
                    //                 o(e.media);
                    //         }
                    //     else
                    //         $(".choose-account-1")
                    //             .find(".toast.error")
                    //             .show()
                    //             .find(".d")
                    //             .html(e.msg);
                    // })
                )
                : $(".choose-account-1")
                    .find(".toast.error")
                    .show()
                    .find(".d")
                    .html("Please enter your Instagram username.");
        }),
        $("#payment #try-now").on("click", function (e) {
            if (
                (($this = $(this)),
                    btn_add_loader($this),
                    (selectedPackage = $(
                        '.choose-account-1 input[name="package"]'
                    ).val()),
                    (selectedPhotos = $(
                        ".select-box input[name=selected_photos]"
                    ).val()),
                    (countPhotos = 1),
                    (username = $(".choose-account-1 input[name=username]").val()),
                countPhotos < 1)
            )
                return (
                    alert("Please select at least one photo to checkout."),
                        btn_remove_loader($this),
                        !1
                );
            ($request = {
                username: username,
                package: selectedPackage,
                items: selectedPhotos,
                _token: _csrftoken,
                email: email
            }),
                $.post("/package/trial/start", $request, function (e) {
                    if (void 0 !== e)
                        if ("ok" == e.status)
                            window.location = "/package/trial/success";
                        else {
                            if (
                                (btn_remove_loader($this),
                                void 0 !== e.trial && 1 == e.trial)
                            )
                                return (
                                    confirm(e.msg) &&
                                    (window.location = "/package/100"),
                                        !1
                                );
                            alert(e.msg);
                        }
                }).error(function () {
                    btn_remove_loader($this);
                });
        }),
        $("#payment #paypal").on("click", function (e) {
            if (
                (e.preventDefault(),
                    ($this = $(this)),
                    btn_add_loader($this),
                    (selectedPackage = $(
                        '.choose-account-1 input[name="package"]'
                    ).val()),
                    (selectedPhotos = $(
                        ".select-box input[name=selected_photos]"
                    ).val()),
                    (countPhotos = 1),
                    (username = $(".choose-account-1 input[name=username]").val()),
                countPhotos < 1)
            )
                return (
                    alert("Please select at least one photo to checkout."),
                        btn_remove_loader($this),
                        !1
                );
            try {
                "popup" == upsale.getMode()
                    ? upsale.showPopup()
                    : checkout.submit();
            } catch (e) {
                console.log(e);
            }
        }),
        $("#payment #stripe").on("click", function (e) {
            if (
                (e.preventDefault(),
                    ($this = $(this)),
                    btn_add_loader($this),
                    (selectedPackage = $(
                        '.choose-account-1 input[name="package"]'
                    ).val()),
                    (selectedPhotos = $(
                        ".select-box input[name=selected_photos]"
                    ).val()),
                    (countPhotos = 1),
                    (username = $(".choose-account-1 input[name=username]").val()),
                countPhotos < 1)
            )
                return (
                    alert("Please select at least one photo to checkout."),
                        btn_remove_loader($this),
                        !1
                );
            try {
                "popup" == upsale.getMode()
                    ? upsale.showPopup()
                    : checkout.submit();
            } catch (e) {
                console.log(e);
            }
        }),
        $(".choose-account-2 .change.single").on("click", function (e) {
            e.preventDefault();
            try {
                upsale.revert();
            } catch (e) {
                console.log(e);
            }
            var o = $(this);
            btn_add_loader(o),
                setTimeout(function () {
                    btn_remove_loader(o),
                        $(".choose-account-1").show(),
                        $(".choose-account-2").hide(),
                        c(),
                        $(".box-form#payment").addClass("disabled");
                }, 500);
        });
    $(document).on("click", ".box-form .select-box ul li", function (e) {
        $(this).hasClass("selected")
            ? ($(this).removeClass("selected"), s($(this).data("value")))
            : ($(this).addClass("selected"),
                selectedPosts.push($(this).data("value")),
                a());
    }),
        $(document).on(
            "click",
            ".selected-photos-summary .row >.remove",
            function (e) {
                s(
                    $(this)
                        .parent()
                        .find(".photo")
                        .data("value")
                );
            }
        ),
        $(".choose-account-2 .load-more").on("click", function (e) {
            e.preventDefault();
            var t = $(this);
            btn_add_loader(t),
                (max_id = $(".choose-account-2 .load-more").attr("data-next")),
                $.get("/user/media/" + username + "?max_id=" + max_id, function (
                    e
                ) {
                    e.has_next_page
                        ? ($(".choose-account-2 .load-more").attr(
                        "data-next",
                        e.max_id
                        ),
                            $(".choose-account-2 .load-more").show(),
                            console.log("change max_id"))
                        : $(".choose-account-2 .load-more").hide(),
                        btn_remove_loader(t),
                        o(e.media);
                });
        }),
        $(".choose-account-auto").on("submit", function (e) {
            e.preventDefault(),
                (username = $(this)
                    .find("input[name=username]")
                    .val());
            var o = $(this).find("button");
            btn_add_loader(o),
                $.get("/user/media/" + username, function (e) {
                    btn_remove_loader(o),
                        e.success
                            ? (e.is_private &&
                            ($(".choose-account-1")
                                .find(".toast.error")
                                .hide(),
                                $(".choose-account-2")
                                    .find(".toast.info")
                                    .show()
                                    .find(".d")
                                    .html(
                                        "Your Instagram is private. This will prevent us from delievering likes. Make sure to set it to public (yes, you can do it later)."
                                    )),
                                (package = $("input[name=package]").val()),
                                $(
                                    ".choose-account-2 .user-details .photo img"
                                ).attr("src", e.profile_picture),
                                $(
                                    ".choose-account-2 .user-details .info .username"
                                ).html(username),
                                (price = getPackage(package, !0).price),
                                (price = "Free" == price ? "Free" : "$" + price),
                                $(
                                    ".choose-account-2 .user-details .info .likes"
                                ).html(
                                    package +
                                    " likes <span>" +
                                    price +
                                    "/mo</span>"
                                ),
                                $(
                                    ".choose-account-2 .user-details .info .likes"
                                ).attr("data-value", package),
                                $("#payment .price").html(
                                    price +
                                    '<span style="font-size: 22px;">/mo</span>'
                                ),
                                $(".choose-account-1").hide(),
                                $(".choose-account-2").show(),
                                $(".box-form#create_login").removeClass(
                                    "disabled"
                                ),
                                $("#create_login .register_form").is(":hidden")
                                    ? ($(".box-form#payment").removeClass(
                                    "disabled"
                                    ),
                                        r(".box-form#payment"))
                                    : r(".box-form#create_login"))
                            : ($(".choose-account-2")
                                .find(".toast.info")
                                .hide(),
                                $(".choose-account-1")
                                    .find(".toast.error")
                                    .show()
                                    .find(".d")
                                    .html(e.msg));
                });
        }),
        $(".choose-account-2 .change.auto").on("click", function (e) {
            e.preventDefault();
            var o = $(this);
            btn_add_loader(o),
                setTimeout(function () {
                    btn_remove_loader(o),
                        $(".choose-account-1").show(),
                        $(".choose-account-2").hide(),
                        c(),
                        $(".box-form#payment").addClass("disabled");
                }, 500);
        }),
        $(".register_form").on("submit", function (e) {
            e.preventDefault();
            var o = $(this).find("button");
            btn_add_loader(o),
                (email = $("#create_login .register_form")
                    .find("input[name=email]")
                    .val()),
                (repeat_email = $("#create_login .register_form")
                    .find("input[name=email_confirmation]")
                    .val()),
                (password = $("#create_login .register_form")
                    .find("input[name=password]")
                    .val()),
                (csrftoken = $("#create_login .register_form")
                    .find("input[name=_token]")
                    .val()),
                $.post(
                    "/account/validate",
                    {
                        email: email,
                        email_confirmation: repeat_email,
                        password: password,
                        _token: csrftoken
                    },
                    function (e) {
                        btn_remove_loader(o),
                            e.success
                                ? ($(
                                ".box-form#create_login .register_form"
                                ).hide(),
                                    $(".box-form#create_login .result")
                                        .show()
                                        .find(".desc strong")
                                        .html(email),
                                $(".choose-account-1").is(":hidden") &&
                                ($(".box-form#payment").removeClass(
                                    "disabled"
                                ),
                                    r(".box-form#payment")),
                                    $(
                                        ".box-form#create_login .result button"
                                    ).removeClass(
                                        "logout-create-account change-email"
                                    ),
                                    void 0 !== e.registered && 1 == e.registered
                                        ? ($(
                                        ".box-form#create_login .result .desc"
                                        ).html(
                                        "You're currently logged in as <strong>" +
                                        email +
                                        "</strong>."
                                        ),
                                            $(
                                                ".box-form#create_login .result button"
                                            )
                                                .addClass("logout-create-account")
                                                .text(
                                                    "Log out and create new account"
                                                ))
                                        : ($(
                                        ".box-form#create_login .result .desc"
                                        ).html(
                                        "We've sent a greeting email to <strong>" +
                                        email +
                                        "</strong>. You don't have to verify anything just yet."
                                        ),
                                            $(
                                                ".box-form#create_login .result button"
                                            )
                                                .addClass("change-email")
                                                .text("Change email")))
                                : $("#create_login .toast.error")
                                    .show()
                                    .find(".d")
                                    .html(e.msg);
                    }
                ).fail(function () {
                    btn_remove_loader(o),
                        $("#create_login .toast.error")
                            .show()
                            .find(".d")
                            .html("Something went wrong. Please try again.");
                });
        }),
        $(".change-email").on("click", function (e) {
            e.preventDefault();
            var o = $(this);
            btn_add_loader(o),
                setTimeout(function () {
                    btn_remove_loader(o),
                        $(".box-form#create_login .register_form").show(),
                        $(".box-form#create_login .result").hide(),
                        $(".box-form#payment").addClass("disabled");
                }, 500);
        }),
        $(".logout-create-account").on("click", function (e) {
            console.log("test"), e.preventDefault();
            var o = $(this);
            btn_add_loader(o),
                $.get("/logout", function (e) {
                    e.success &&
                    ($(".box-form#create_login .title").show(),
                        $(".box-form#create_login .register_form").show(),
                        $(".box-form#create_login .register_form").show(),
                        $(".box-form#create_login .result").hide(),
                        $(".box-form#payment").addClass("disabled"),
                        btn_remove_loader(o));
                });
        }),
        $("#payment #pay-paypal").on("click", function () {
            var e = $(this);
            btn_add_loader(e),
                $.get(
                    "/payment/paypal/subscribe",
                    {
                        email: email,
                        password: password,
                        username: username,
                        package: package
                    },
                    function (o) {
                        o.success
                            ? (window.location = o.redirect)
                            : (btn_remove_loader(e), alert(o.msg));
                    }
                );
        }),
    $('.choose-account-single input[data-load="true"]').length &&
    $(".choose-account-single button.btn-style").trigger("click"),
    $('.choose-account-auto input[data-load="true"]').length &&
    $(".choose-account-auto button.btn-style").trigger("click");
});
