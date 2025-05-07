"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function CourseList({ courses }) {
  const [visibleCourses, setVisibleCourses] = useState(5);

  const handleShowMore = () => {
    setVisibleCourses((prev) => prev + 5);
  };

  if (!courses || courses.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Completed Courses</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <ReaderIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No completed courses yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Start learning to build your skills
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">Completed Courses</h2>
      <div className="space-y-4">
        {courses.slice(0, visibleCourses).map((course) => (
          <div key={course.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0 rounded-md w-12 h-12 bg-primary/10 flex items-center justify-center">
                <ReaderIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4 flex-1">
                <h4 className="font-medium">{course.title}</h4>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="mr-3">
                    Completed on:{" "}
                    {new Date(course.completed_at).toLocaleDateString()}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                </div>

                {course.completion_percentage && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                )}
              </div>
              <div className="ml-4">
                <Link
                  href={`/courses/${course.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {courses.length > visibleCourses && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={handleShowMore}>
            Show more courses
          </Button>
        </div>
      )}
    </div>
  );
}
