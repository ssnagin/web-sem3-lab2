package com.ssnagin.controllers

import jakarta.servlet.ServletConfig
import jakarta.servlet.http.HttpServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

class ControllerServlet : HttpServlet() {

    override fun init(config : ServletConfig) {
        super.init(config)
    }

    override fun doPost(req: HttpServletRequest?, resp: HttpServletResponse?) {
        super.doPost(req, resp)
    }


}