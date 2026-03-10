import React, { useState } from 'react';
import { Check, Zap, Shield, Globe, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const PricingView: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals starting their cloud journey.',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Access to 50+ Basic Labs',
        'Community Support',
        'Standard Sandbox (1 vCPU, 2GB RAM)',
        'Public Skill Tree Progress',
        'Limited Terminal Sessions'
      ],
      cta: 'Get Started',
      highlight: false
    },
    {
      name: 'Pro',
      description: 'For serious engineers mastering advanced cloud tech.',
      price: { monthly: 29, yearly: 19 },
      features: [
        'Access to 1000+ Premium Labs',
        'Priority Email Support',
        'High-Performance Sandbox (2 vCPU, 4GB RAM)',
        'Private Skill Tree Progress',
        'Unlimited Terminal Sessions',
        'Certification Prep Paths',
        'Early Access to New Labs'
      ],
      cta: 'Start Pro Trial',
      highlight: true
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for engineering teams and organizations.',
      price: { monthly: 'Custom', yearly: 'Custom' },
      features: [
        'Everything in Pro',
        'Dedicated Account Manager',
        'Custom Lab Development',
        'Team Analytics Dashboard',
        'SSO & Advanced Security',
        'LMS Integration',
        'Volume Licensing'
      ],
      cta: 'Contact Sales',
      highlight: false
    }
  ];

  const handleAction = (planName: string) => {
    alert(`Thank you for your interest in the ${planName} plan! This feature is currently disabled.`);
  };

  return (
    <div className="bg-white min-h-screen pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 tracking-tight">
              Simple, Transparent <span className="text-brand-blue">Pricing.</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10">
              Invest in your career with hands-on cloud engineering education. Choose the plan that fits your goals.
            </p>

            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-zinc-900' : 'text-zinc-400'}`}>Monthly</span>
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-14 h-7 bg-zinc-100 rounded-full p-1 relative transition-colors hover:bg-zinc-200"
              >
                <div className={`w-5 h-5 bg-zinc-900 rounded-full shadow-sm transition-transform ${billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'}`}></div>
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-zinc-900' : 'text-zinc-400'}`}>Yearly</span>
                <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Save 35%</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-[2rem] border transition-all duration-500 ${
                plan.highlight 
                  ? 'border-zinc-900 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] bg-white z-10 scale-105 after:shadow-[inset_0_-8px_0_0_rgba(0,0,0,0.05)]' 
                  : 'border-zinc-200 bg-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] after:shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.02)] hover:after:shadow-[inset_0_-8px_0_0_rgba(0,0,0,0.04)]'
              } flex flex-col relative after:absolute after:inset-0 after:rounded-[2rem] after:pointer-events-none`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{plan.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-zinc-900">
                    {typeof plan.price[billingCycle === 'yearly' ? 'yearly' : 'monthly'] === 'number' ? '$' : ''}
                    {plan.price[billingCycle === 'yearly' ? 'yearly' : 'monthly']}
                  </span>
                  {typeof plan.price[billingCycle === 'yearly' ? 'yearly' : 'monthly'] === 'number' && (
                    <span className="text-zinc-500 text-sm font-medium">/mo</span>
                  )}
                </div>
                {billingCycle === 'yearly' && typeof plan.price.yearly === 'number' && (
                  <p className="text-brand-blue text-xs font-bold mt-2">Billed annually (${plan.price.yearly * 12}/year)</p>
                )}
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-600">
                    <Check className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleAction(plan.name)}
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-sm active:shadow-inner active:scale-[0.98] ${plan.highlight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50'}`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table (Simplified for distinct look) */}
        <div className="bg-zinc-900 rounded-[2.5rem] p-12 md:p-20 text-white overflow-hidden relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)]">
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why upgrade to Pro?</h2>
              <p className="text-zinc-400 mb-10 leading-relaxed">
                Unlock the full potential of Realcloud with advanced features designed to accelerate your engineering career.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">High-Perf Sandbox</h4>
                    <p className="text-xs text-zinc-500">Faster builds and execution.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Terminal className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Unlimited Sessions</h4>
                    <p className="text-xs text-zinc-500">Learn without boundaries.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Cert Prep</h4>
                    <p className="text-xs text-zinc-500">Pass AWS/GCP exams easily.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Private Profile</h4>
                    <p className="text-xs text-zinc-500">Control your learning data.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Pro Membership
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-zinc-400">Monthly Price</span>
                  <span className="font-bold">$29</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-zinc-400">Annual Price (Save 35%)</span>
                  <span className="font-bold">$228</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-sm text-zinc-400">Trial Period</span>
                  <span className="font-bold">7 Days Free</span>
                </div>
              </div>
              <button className="w-full py-4 bg-brand-blue text-white rounded-xl font-black hover:bg-brand-blue/90 transition-all uppercase tracking-widest text-xs shadow-lg shadow-brand-blue/20">
                Start My Free Trial
              </button>
            </div>
          </div>
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-blue/10 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};
