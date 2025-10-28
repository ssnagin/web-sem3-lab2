package com.ssnagin.controllers

import com.ssnagin.controllers.wrappers.HttpPOSTServletWrapper
import com.sun.net.httpserver.Request
import jakarta.servlet.RequestDispatcher
import jakarta.servlet.ServletConfig
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.io.Console

@WebServlet("/controller")
class ControllerServlet : HttpPOSTServletWrapper() {

    private val REDIRECT = "index.jsp"

    override fun init(config : ServletConfig) {
        super.init(config)
    }

    override fun doPost(req: HttpServletRequest, resp: HttpServletResponse) {

        println(req.toString())
        println(resp.toString())

        val name = req.getParameter("sn-form")
        var dispatcher: RequestDispatcher? = null

        if (name.isNullOrBlank()) {
            resp.sendRedirect(REDIRECT)
            return
        }

        try {
            dispatcher = req.getRequestDispatcher("/$name")

            if (dispatcher == null) {
                resp.sendRedirect(REDIRECT)
                return
            }

            dispatcher.forward(req, resp)

        } catch (e : Exception) {
            resp.sendError(500)
        }
    }
}