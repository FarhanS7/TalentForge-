"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <Card className="shadow-sm">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <PersonIcon className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <CardTitle className="text-xl">
          {user.first_name} {user.last_name}
        </CardTitle>
        <p className="text-gray-500 mt-1">{user.job_title || "Student"}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Email</p>
            <p className="text-sm">{user.email || "Not provided"}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">University</p>
            <p className="text-sm">{user.university || "Not provided"}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Major</p>
            <p className="text-sm">{user.major || "Not provided"}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Graduation Year</p>
            <p className="text-sm">{user.graduation_year || "Not provided"}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full space-y-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/profile">View Full Profile</Link>
          </Button>

          {user.public_profile_url && (
            <Button variant="secondary" className="w-full" asChild>
              <Link href={`/profile/${user.username}`}>Public Profile</Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
