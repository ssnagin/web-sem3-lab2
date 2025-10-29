package com.ssnagin.controllers

import com.ssnagin.controllers.wrappers.HttpPOSTServletWrapper
import jakarta.servlet.RequestDispatcher
import jakarta.servlet.ServletConfig
import jakarta.servlet.annotation.WebServlet
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import java.util.logging.Logger

@WebServlet("/controller")
class ControllerServlet : HttpPOSTServletWrapper() {

    private val logger: Logger = Logger.getLogger(ControllerServlet::class.java.name)

    private val REDIRECT = "index.jsp"

    override fun init(config : ServletConfig) {
        super.init(config)
    }

    override fun doPost(req: HttpServletRequest, resp: HttpServletResponse) {

        val parameterNames = req.parameterNames


        println("INCOMING REQUEST FROM ${req.localAddr}")
        while (parameterNames.hasMoreElements()) {
            val paramName = parameterNames.nextElement()
            val paramValues = req.getParameterValues(paramName)

            println("Parameter: $paramName")
            paramValues?.forEach { value ->
                println("  Value: $value")
            }
        }
        println(resp.toString())

        val name = req.getParameter("sn-form")
        val dispatcher: RequestDispatcher?

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