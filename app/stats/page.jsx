'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AnalyticsChart from '@/components/analyticsChart';
import FormUsageChart from '@/components/pieChart';
import AverageTimeSpentChart from '@/components/barChart';
import CourseSignupChart from '@/components/courseSignUpChart';
import CategoryUsageChart from '@/components/categoryUsageChart';
import NavBar from '@/components/NavBar';
import { auth } from '/app/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './styles.css';

const Analytics = () => {
  const [dailyUsers, setDailyUsers] = useState([]);
  const [formUsage, setFormUsage] = useState([]);
  const [averageTimeSpent, setAverageTimeSpent] = useState([]);
  const [courseSignups, setCourseSignUps] = useState([]);
  const [categoryUsage, setCategoryUsage] = useState([]);
  const [Language, setLanguage] = useState("HE");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (currentUser) {
      // Mock data for demonstration
      const mockDailyUsers = Array.from({ length: 30 }, (_, i) => ({
        date: `2024-07-${String(i + 1).padStart(2, '0')}`,
        users: Math.floor(Math.random() * 1000) + 100,
      }));

      const mockFormUsage = [Math.floor(Math.random() * 1000), 1000 - Math.floor(Math.random() * 1000)];

      const mockAverageTimeSpent = Array.from({ length: 12 }, (_, i) => ({
        month: `2024-${String(i + 1).padStart(2, '0')}`,
        timeSpent: Math.floor(Math.random() * 100) + 1,
      }));

      const mockCourseSignups = [
        { course: 'Language Exchange', signups: Math.floor(Math.random() * 100) },
        { course: 'Spoken Languages', signups: Math.floor(Math.random() * 100) },
        { course: 'Translation Services', signups: Math.floor(Math.random() * 100) },
        { course: 'Workshop and activities', signups: Math.floor(Math.random() * 100) },
        { course: 'Volunteer', signups: Math.floor(Math.random() * 100) },
        { course: 'Career advancing', signups: Math.floor(Math.random() * 100) },
        { course: 'TeamWork ', signups: Math.floor(Math.random() * 100) },
        { course: 'Other', signups: Math.floor(Math.random() * 100) },
      ];
      const mockCategoryUsage = [
        { category: 'Beginner Courses', count: Math.floor(Math.random() * 200) + 50 },
        { category: 'Academic Language Courses', count: Math.floor(Math.random() * 200) + 50 },
        { category: 'Career Language Courses', count: Math.floor(Math.random() * 200) + 50 },
        { category: 'Hebrew for Personal Development', count: Math.floor(Math.random() * 200) + 50 },
      ];

      setDailyUsers(mockDailyUsers);
      setFormUsage(mockFormUsage);
      setAverageTimeSpent(mockAverageTimeSpent);
      setCourseSignUps(mockCourseSignups);
      setCategoryUsage(mockCategoryUsage);
    }
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar language={Language} />
      <div className='container'>
        <div className='chartContainer'>
          <h2>Daily Users</h2>
          <AnalyticsChart data={dailyUsers} />
        </div>
        <div className='chartContainer'>
          <h2>Form Usage</h2>
          <FormUsageChart data={formUsage} />
        </div>
        <div className='chartContainer'>
          <h2>Average Time Spent per Month</h2>
          <AverageTimeSpentChart data={averageTimeSpent} />
        </div>
      </div>
      <div className='container'>
        <div className='chartContainer'>
          <h2>Number of users that signed up to Courses</h2>
          <CourseSignupChart data={courseSignups} />
        </div>
        <div className='chartContainer'>
          <h2>Level of Hebrew</h2>
          <CategoryUsageChart data={categoryUsage} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
