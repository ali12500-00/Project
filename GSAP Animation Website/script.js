let tl=gsap.timeline();

tl.from("nav h2, nav a, nav button",{
    y:-30,
    duration:1,
    stagger:0.5,
    opacity:0,
    delay:1,
})
tl.from("#page-part-1 h2, #page-part-1 p,#page-part-1 button",{
    x:-300,
    duration:1,
    opacity:0,
    // delay:1,
    stagger:0.5,
})
tl.from("#page-part-2",{
    x:300,
    duration:0.5,
    opacity:0,
},"-=0.3")
tl.from("#page-2",{
    x:300,
    duration:1,
    opacity:0,
    // delay:1,
    stagger:0.5,
})


let tl2=gsap.timeline({
    scrollTrigger:{
        trigger:"#section-2",
        scroll:"body",
        // markers:true,
        start:"top 50%",
        end:"top  -50%",
        scrub:1,
    }
})
tl2.from("#services",{
    x:-300,
    duration:1,
    opacity:0,
    // delay:1,
    stagger:0.5,
})
tl2.from(".line1-left",{
    x:-300,
    duration:1,
    opacity:0,
},"anim1") 
tl2.from(".line1-right",{
    x:300,
    duration:1,
    opacity:0,   
},"anim1")

tl2.from(".line2-left",{
    x:-300,
    duration:1,
    opacity:0,
},"anim2") 
tl2.from(".line2-right",{
    x:300,
    duration:1,
    opacity:0,   
},"anim2")
