package com.ssnagin.controllers

import com.ssnagin.controllers.wrappers.HttpPOSTServletWrapper
import jakarta.servlet.ServletConfig
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse

@WebServlet("/controller")
class ControllerServletWrapper : HttpPOSTServletWrapper() {

    override fun init(config : ServletConfig) {
        super.init(config)
    }

    override fun doPost(req: HttpServletRequest?, resp: HttpServletResponse?) {
        super.doPost(req, resp)
        
    }
}