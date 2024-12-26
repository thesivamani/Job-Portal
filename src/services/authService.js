const AUTH_KEY = 'auth_user';
const STUDENTS_KEY = 'students';
const RECRUITERS_KEY = 'recruiters';

class AuthService {
    login(email, password) {
        // Check both students and recruiters
        const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
        const recruiters = JSON.parse(localStorage.getItem(RECRUITERS_KEY) || '[]');

        const student = students.find(s => s.email === email && s.password === password);
        const recruiter = recruiters.find(r => r.email === email && r.password === password);

        const user = student || recruiter;

        if (user) {
            const authUser = {
                id: user.id,
                name: user.fullName,
                email: user.email,
                role: student ? 'student' : 'recruiter',
                // Add other non-sensitive info you want to keep in session
            };
            localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
            return authUser;
        }
        throw new Error('Invalid email or password');
    }

    registerStudent(userData) {
        const students = JSON.parse(localStorage.getItem(STUDENTS_KEY) || '[]');
        
        // Check if email already exists
        if (students.some(s => s.email === userData.email)) {
            throw new Error('Email already registered');
        }

        const newStudent = {
            ...userData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };

        students.push(newStudent);
        localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));

        // Auto login after registration
        const authUser = {
            id: newStudent.id,
            name: newStudent.fullName,
            email: newStudent.email,
            role: 'student'
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
        return authUser;
    }

    registerRecruiter(userData) {
        const recruiters = JSON.parse(localStorage.getItem(RECRUITERS_KEY) || '[]');
        
        if (recruiters.some(r => r.email === userData.email)) {
            throw new Error('Email already registered');
        }

        const newRecruiter = {
            ...userData,
            id: Date.now(),
            createdAt: new Date().toISOString()
        };

        recruiters.push(newRecruiter);
        localStorage.setItem(RECRUITERS_KEY, JSON.stringify(recruiters));

        // Auto login after registration with company info
        const authUser = {
            id: newRecruiter.id,
            name: newRecruiter.fullName,
            email: newRecruiter.email,
            role: 'recruiter',
            companyName: newRecruiter.companyName,
            companyLogo: newRecruiter.companyLogo || "https://via.placeholder.com/150",
            phoneNumber: newRecruiter.phoneNumber
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(authUser));
        return authUser;
    }

    logout() {
        localStorage.removeItem(AUTH_KEY);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(AUTH_KEY));
    }

    isRecruiter() {
        const user = this.getCurrentUser();
        return user?.role === 'recruiter';
    }

    isStudent() {
        const user = this.getCurrentUser();
        return user?.role === 'student';
    }
}

export const authService = new AuthService(); 