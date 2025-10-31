package com.ssnagin.context

import com.ssnagin.servlets.coordinates.geometry.Point2DR
import java.time.LocalDateTime

data class Point2DRRow (
    val point2DR: Point2DR,
    val timestamp: LocalDateTime = LocalDateTime.now(),
    var executionTime: Long = 0,
    var isInArea: Boolean = false
) {}