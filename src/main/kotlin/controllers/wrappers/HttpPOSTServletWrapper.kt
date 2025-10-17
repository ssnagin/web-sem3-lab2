package com.ssnagin.controllers.wrappers

import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

abstract class HttpPOSTServletWrapper : HttpServlet() {

    override fun doGet(req: HttpServletRequest?, resp: HttpServletResponse?) {
        super.doGet(req, resp)

        if (resp == null) return
        resp.sendRedirect(req?.contextPath)
    }
}