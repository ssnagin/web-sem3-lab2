package com.ssnagin.coordinates.builders

import java.math.BigDecimal

class Point2DRBuilder {
    companion object fun build(xObj : Any, yObj : Any, rObj : Any) {
        val x = BigDecimal(xObj.toString())
        val y = BigDecimal(yObj.toString())
        val r = BigDecimal(rObj.toString())


    }
}