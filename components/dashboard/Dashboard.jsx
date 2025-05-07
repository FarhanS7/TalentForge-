"use client";

import CourseList from "@/components/courselist/CourseList";
import ProfileCard from "@/components/profilecard/ProfileCard";
import Sidebar from "@/components/sidebar/Sidebar";
import SkillsDisplay from "@/components/skillsdisplay/SkillsDisplay";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch user profile
        const userRes = await fetch(
          "https://hackathon.flink.com.bd/api/profile/me",
          { headers }
        );

        if (!userRes.ok) {
          if (userRes.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          throw new Error("Failed to fetch user data");
        }

        const userData = await userRes.json();
        setUser(userData);

        // Fetch completed courses
        const coursesRes = await fetch(
          "https://hackathon.flink.com.bd/api/user/completed-courses",
          { headers }
        );
        if (coursesRes.ok) {
          const coursesData = await coursesRes.json();
          setCompletedCourses(coursesData);
        }

        // Fetch skills
        const skillsRes = await fetch(
          "https://hackathon.flink.com.bd/api/user/skills",
          { headers }
        );
        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          setSkills(skillsData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertDescription>
              {error || "Failed to load dashboard. Please try again."}
            </AlertDescription>
          </Alert>
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </button>
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar user={user} onLogout={handleLogout} />

      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileCard user={user} />
          </div>

          <div className="lg:col-span-2">
            <Tabs
              defaultValue="skills"
              className="bg-white rounded-lg shadow-sm"
            >
              <TabsList className="w-full border-b">
                <TabsTrigger value="skills" className="flex-1">
                  My Skills
                </TabsTrigger>
                <TabsTrigger value="courses" className="flex-1">
                  Completed Courses
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="skills">
                  <SkillsDisplay skills={skills} />
                </TabsContent>

                <TabsContent value="courses">
                  <CourseList courses={completedCourses} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
