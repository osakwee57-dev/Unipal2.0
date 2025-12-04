import React, { useState, useEffect, useRef } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LogOut, Home, BookOpen, Library, Bot, Zap, Settings, Menu, X, Sun, Moon, Search, ChevronDown, Check } from 'lucide-react';
import { University, Course, Level } from './types';
import { getSubjectsForCourse, UNIVERSITIES, COURSES, MOCK_LIBRARY, MOCK_QUIZ } from './constants';
import { geminiService } from './services/geminiService';

// --- SHARED UI COMPONENTS ---

interface SearchableSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div 
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`block w-full rounded-md border p-3 flex justify-between items-center ${
            isOpen ? 'ring-2 ring-naija-green-500 border-naija-green-500' : 'border-gray-300 dark:border-gray-600'
        } dark:bg-gray-700 dark:text-white`}>
          <span className={value ? "text-gray-900 dark:text-white" : "text-gray-500"}>
            {value || placeholder || "Select..."}
          </span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600 max-h-60 flex flex-col">
          <div className="p-2 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
             <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-naija-green-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Search..."
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
             </div>
          </div>
          <div className="overflow-y-auto flex-1">
            {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                    <div 
                        key={opt} 
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-naija-green-50 dark:hover:bg-gray-700 flex justify-between items-center ${value === opt ? 'bg-naija-green-50 dark:bg-gray-700 text-naija-green-700 dark:text-naija-green-400 font-medium' : 'text-gray-700 dark:text-gray-200'}`}
                        onClick={() => handleSelect(opt)}
                    >
                        {opt}
                        {value === opt && <Check size={16} />}
                    </div>
                ))
            ) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


// --- COMPONENTS ---

// 1. Login Component
const Login: React.FC = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) return;
    login(isLogin ? (name || "Student") : name, email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-naija-green-50 to-scholarly-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-naija-green-600 dark:text-naija-green-400">UniPal</h1>
          <p className="text-gray-500 dark:text-gray-400">Your Ultimate Campus Companion</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-naija-green-500 focus:ring-naija-green-500 dark:bg-gray-700 dark:text-white p-3 border"
                placeholder="Emeka Okafor"
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-naija-green-500 focus:ring-naija-green-500 dark:bg-gray-700 dark:text-white p-3 border"
              placeholder="student@uni.edu.ng"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-naija-green-500 focus:ring-naija-green-500 dark:bg-gray-700 dark:text-white p-3 border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-naija-green-600 hover:bg-naija-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-naija-green-500 transition-colors"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-scholarly-blue-500 hover:text-scholarly-blue-600 font-medium"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Onboarding Component
const Onboarding: React.FC = () => {
  const { updateProfile, user } = useAuth();
  const [uni, setUni] = useState('');
  const [course, setCourse] = useState('');
  const [level, setLevel] = useState(Level.L100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uni && course) {
        updateProfile({ university: uni, course: course, level: level });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg h-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Let's set up your profile to personalize your experience.</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <SearchableSelect 
            label="Select University"
            options={UNIVERSITIES}
            value={uni}
            onChange={setUni}
            placeholder="Search for your university..."
          />

          <SearchableSelect 
            label="Course of Study"
            options={COURSES}
            value={course}
            onChange={setCourse}
            placeholder="Search for your course..."
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white p-3 border focus:ring-naija-green-500"
            >
              {Object.values(Level).map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <button
            type="submit"
            disabled={!uni || !course}
            className={`w-full py-3 px-4 text-white rounded-md font-bold transition-colors ${
                uni && course ? 'bg-naija-green-600 hover:bg-naija-green-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

// 3. Feature Components

const Dashboard: React.FC<{ changeTab: (tab: string) => void }> = ({ changeTab }) => {
  const { user } = useAuth();
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-naija-green-600 to-scholarly-blue-600 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="mt-2 opacity-90">{user?.university}</p>
        <p className="text-sm opacity-75">{user?.course} • {user?.level}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div onClick={() => changeTab('subjects')} className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-300">
            <BookOpen size={24} />
          </div>
          <span className="font-semibold text-gray-800 dark:text-white">My Subjects</span>
        </div>
        
        <div onClick={() => changeTab('library')} className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-600 dark:text-purple-300">
            <Library size={24} />
          </div>
          <span className="font-semibold text-gray-800 dark:text-white">Library</span>
        </div>

        <div onClick={() => changeTab('guru')} className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-900 rounded-full text-amber-600 dark:text-amber-300">
            <Bot size={24} />
          </div>
          <span className="font-semibold text-gray-800 dark:text-white">AI Guru</span>
        </div>

        <div onClick={() => changeTab('quiz')} className="cursor-pointer bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center space-y-3">
          <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full text-red-600 dark:text-red-300">
            <Zap size={24} />
          </div>
          <span className="font-semibold text-gray-800 dark:text-white">Quiz Zone</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Upcoming</h3>
        <div className="space-y-4">
            <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="w-2 h-12 bg-yellow-400 rounded-full mr-4"></div>
                <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Mid-Semester Test</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow at 10:00 AM</p>
                </div>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="w-2 h-12 bg-naija-green-500 rounded-full mr-4"></div>
                <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Study Group Meeting</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Friday at 4:00 PM • Main Library</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const SubjectList: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get detailed subjects or fallback to generic ones
  const allSubjects = user?.course ? getSubjectsForCourse(user.course) : [];
  
  const filteredSubjects = allSubjects.filter(sub => 
    sub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
           <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Subjects</h2>
           <div className="relative w-full md:w-64">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Search subjects..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-naija-green-500 outline-none dark:text-white"
                />
           </div>
       </div>

       <div className="grid gap-4">
         {filteredSubjects.length > 0 ? filteredSubjects.map((sub) => (
           <div key={sub.id} className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-naija-green-500 transition-colors cursor-pointer group">
             <div className="flex justify-between items-start">
               <div>
                 <span className="text-xs font-bold text-naija-green-600 dark:text-naija-green-400 bg-naija-green-50 dark:bg-naija-green-900 px-2 py-1 rounded">{sub.code}</span>
                 <h3 className="text-lg font-semibold mt-2 text-gray-900 dark:text-white group-hover:text-naija-green-600 transition-colors">{sub.title}</h3>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sub.description}</p>
               </div>
             </div>
           </div>
         )) : (
             <div className="text-center py-10 text-gray-500">
                 No subjects found.
             </div>
         )}
       </div>
    </div>
  );
};

const LibrarySection: React.FC = () => {
    const { user } = useAuth();
    const [filter, setFilter] = useState('All');
    
    // Filter logic: Show items for current course or 'Other', then filter by type
    const items = MOCK_LIBRARY.filter(item => {
        const courseMatch = item.course === user?.course || item.course === "Other" || item.course === "General"; // simplified for broader matching
        if (filter === 'All') return true;
        return item.type === filter;
    });

    return (
        <div className="p-4 md:p-8 space-y-6 h-[calc(100vh-80px)] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Digital Library</h2>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                {['All', 'Textbook', 'Past Question', 'Handout'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                            filter === f 
                            ? 'bg-naija-green-600 text-white' 
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.length > 0 ? items.map(item => (
                    <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <span className={`w-2 h-2 rounded-full ${item.type === 'Textbook' ? 'bg-blue-500' : item.type === 'Past Question' ? 'bg-orange-500' : 'bg-purple-500'}`}></span>
                                <span className="text-xs text-gray-500 uppercase">{item.type}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">By {item.author}</p>
                            {item.course && item.course !== "Other" && (
                                <span className="inline-block mt-2 text-[10px] bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-gray-500">{item.course}</span>
                            )}
                        </div>
                        <button className="mt-4 w-full py-2 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-naija-green-600 dark:text-naija-green-400 font-medium rounded-lg text-sm transition-colors">
                            Read Now
                        </button>
                    </div>
                )) : (
                    <div className="col-span-full text-center py-10 text-gray-500 flex flex-col items-center">
                        <Library size={48} className="text-gray-300 mb-3" />
                        <p>No resources found in the library for this filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const QuizSection: React.FC = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswer = (idx: number) => {
        if (idx === MOCK_QUIZ[currentQ].correctAnswer) {
            setScore(score + 1);
        }
        
        const nextQ = currentQ + 1;
        if (nextQ < MOCK_QUIZ.length) {
            setCurrentQ(nextQ);
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQ(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-[80vh]">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Quiz Zone</h2>
            
            {showScore ? (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg text-center max-w-sm w-full">
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Quiz Completed!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You scored {score} out of {MOCK_QUIZ.length}</p>
                    <button 
                        onClick={resetQuiz}
                        className="w-full py-3 bg-naija-green-600 text-white rounded-xl font-bold hover:bg-naija-green-700"
                    >
                        Try Again
                    </button>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg w-full max-w-2xl border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-sm font-medium text-gray-500">Question {currentQ + 1}/{MOCK_QUIZ.length}</span>
                        <span className="text-sm font-medium text-naija-green-600">General Knowledge</span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 dark:text-white mb-8">
                        {MOCK_QUIZ[currentQ].question}
                    </h3>

                    <div className="space-y-3">
                        {MOCK_QUIZ[currentQ].options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                className="w-full text-left p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-naija-green-500 transition-all text-gray-700 dark:text-gray-300"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const AIGuru: React.FC = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            geminiService.startChat(user.name, user.course || 'University');
            setMessages([{ role: 'model', text: `Hello ${user.name.split(' ')[0]}! I'm The Guru. How can I help you scatter your exams today? Ask me anything about your studies.` }]);
        }
    }, [user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        try {
            const response = await geminiService.sendMessage(userMsg);
            setMessages(prev => [...prev, { role: 'model', text: response }]);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestions = ["Summarize my notes", "Explain a difficult concept", "Help with assignment", "Study tips"];

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] md:h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center shadow-sm z-10">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Bot size={24} className="text-amber-600" />
                </div>
                <div>
                    <h2 className="font-bold text-gray-800 dark:text-white">The Guru</h2>
                    <p className="text-xs text-gray-500 dark:text-green-400 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> Online
                    </p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.role === 'user' 
                            ? 'bg-naija-green-600 text-white rounded-br-none' 
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-none'
                        }`}>
                             <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                         <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700">
                             <div className="flex space-x-1">
                                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                             </div>
                         </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                {messages.length < 3 && (
                    <div className="flex space-x-2 overflow-x-auto mb-3 pb-1 no-scrollbar">
                        {suggestions.map(s => (
                            <button 
                                key={s} 
                                onClick={() => setInput(s)}
                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 whitespace-nowrap"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                )}
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask anything..."
                        className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-naija-green-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-naija-green-600 text-white p-2 rounded-full hover:bg-naija-green-700 disabled:opacity-50"
                    >
                        <Zap size={20} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const SettingsPage: React.FC = () => {
    const { user, logout, updateProfile } = useAuth();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
            setIsDark(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Profile</h3>
                </div>
                <div className="p-4 space-y-4">
                    <div>
                        <label className="text-sm text-gray-500 dark:text-gray-400">Full Name</label>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    </div>
                    <div>
                        <SearchableSelect
                            label="University"
                            value={user?.university || ''}
                            options={UNIVERSITIES}
                            onChange={(val) => updateProfile({ university: val as University })}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Appearance & Notifications</h3>
                </div>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            {isDark ? <Moon size={20} className="text-gray-500"/> : <Sun size={20} className="text-amber-500" />}
                            <span className="text-gray-900 dark:text-white">Dark Mode</span>
                        </div>
                        <button 
                            onClick={toggleTheme}
                            className={`w-12 h-6 rounded-full p-1 transition-colors ${isDark ? 'bg-naija-green-600' : 'bg-gray-300'}`}
                        >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                     <div className="flex items-center justify-between">
                        <span className="text-gray-900 dark:text-white">Exam Reminders</span>
                        <div className="w-12 h-6 bg-naija-green-600 rounded-full p-1 cursor-pointer">
                            <div className="bg-white w-4 h-4 rounded-full shadow-md translate-x-6"></div>
                        </div>
                    </div>
                </div>
            </div>

            <button 
                onClick={logout}
                className="w-full py-3 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 font-bold rounded-xl flex items-center justify-center space-x-2 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
                <LogOut size={20} />
                <span>Log Out</span>
            </button>
        </div>
    );
};

// 4. Layout & Routing

const MainLayout: React.FC = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Desktop Sidebar Item Component
    interface SidebarItemProps {
        id: string;
        icon: React.ElementType;
        label: string;
    }
    
    const SidebarItem: React.FC<SidebarItemProps> = ({ id, icon: Icon, label }) => (
        <button 
            onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                activeTab === id 
                ? 'bg-naija-green-50 text-naija-green-700 dark:bg-naija-green-900/30 dark:text-naija-green-400 font-bold' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
        >
            <Icon size={20} />
            <span>{label}</span>
        </button>
    );

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 overflow-hidden font-sans">
            
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full p-4">
                <div className="mb-8 px-4 mt-2">
                    <h1 className="text-2xl font-bold text-naija-green-600 dark:text-naija-green-400 tracking-tight">UniPal.</h1>
                </div>
                <nav className="space-y-2 flex-1">
                    <SidebarItem id="home" icon={Home} label="Dashboard" />
                    <SidebarItem id="subjects" icon={BookOpen} label="My Subjects" />
                    <SidebarItem id="library" icon={Library} label="Library" />
                    <SidebarItem id="guru" icon={Bot} label="AI Guru" />
                    <SidebarItem id="quiz" icon={Zap} label="Quiz Zone" />
                    <SidebarItem id="settings" icon={Settings} label="Settings" />
                </nav>
            </aside>

            {/* Mobile/Tablet Content Area */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Mobile Header */}
                <header className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center z-20">
                    <h1 className="text-xl font-bold text-naija-green-600 dark:text-naija-green-400">UniPal.</h1>
                    <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-600 dark:text-gray-300">
                        <Menu size={24} />
                    </button>
                </header>

                {/* Mobile Drawer */}
                {isSidebarOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
                        <div className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-4 shadow-2xl animate-slide-in">
                            <div className="flex justify-end mb-6">
                                <button onClick={() => setSidebarOpen(false)}><X size={24} /></button>
                            </div>
                            <nav className="space-y-2">
                                <SidebarItem id="home" icon={Home} label="Dashboard" />
                                <SidebarItem id="subjects" icon={BookOpen} label="My Subjects" />
                                <SidebarItem id="library" icon={Library} label="Library" />
                                <SidebarItem id="guru" icon={Bot} label="AI Guru" />
                                <SidebarItem id="quiz" icon={Zap} label="Quiz Zone" />
                                <SidebarItem id="settings" icon={Settings} label="Settings" />
                            </nav>
                        </div>
                    </div>
                )}

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
                    {activeTab === 'home' && <Dashboard changeTab={setActiveTab} />}
                    {activeTab === 'subjects' && <SubjectList />}
                    {activeTab === 'library' && <LibrarySection />}
                    {activeTab === 'guru' && <AIGuru />}
                    {activeTab === 'quiz' && <QuizSection />}
                    {activeTab === 'settings' && <SettingsPage />}
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="md:hidden absolute bottom-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around p-3 z-30 pb-safe">
                    <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-naija-green-600' : 'text-gray-400'}`}>
                        <Home size={20} />
                        <span className="text-[10px] mt-1">Home</span>
                    </button>
                    <button onClick={() => setActiveTab('subjects')} className={`flex flex-col items-center ${activeTab === 'subjects' ? 'text-naija-green-600' : 'text-gray-400'}`}>
                        <BookOpen size={20} />
                        <span className="text-[10px] mt-1">Subjects</span>
                    </button>
                    <button onClick={() => setActiveTab('guru')} className={`flex flex-col items-center -mt-8 bg-naija-green-600 text-white p-3 rounded-full shadow-lg`}>
                        <Bot size={24} />
                    </button>
                    <button onClick={() => setActiveTab('library')} className={`flex flex-col items-center ${activeTab === 'library' ? 'text-naija-green-600' : 'text-gray-400'}`}>
                        <Library size={20} />
                        <span className="text-[10px] mt-1">Library</span>
                    </button>
                    <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center ${activeTab === 'settings' ? 'text-naija-green-600' : 'text-gray-400'}`}>
                        <Settings size={20} />
                        <span className="text-[10px] mt-1">Settings</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

// Root App Component
const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-naija-green-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  if (!user.hasCompletedOnboarding) {
    return <Onboarding />;
  }

  return <MainLayout />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;