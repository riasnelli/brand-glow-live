import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface FormData {
  // Step 1
  projectType: string[];
  projectTypeOther: string;
  // Step 2
  brandName: string;
  industry: string;
  targetAudience: string;
  brandDescription: string;
  // Step 3
  name: string;
  email: string;
  whatsapp: string;
  website: string;
}

const PROJECT_TYPES = [
  { id: 'logo', label: 'Logo Design', labelAr: 'تصميم شعار' },
  { id: 'brand-identity', label: 'Brand Identity', labelAr: 'هوية بصرية' },
  { id: 'product', label: 'Product Branding', labelAr: 'تصميم منتج' },
  { id: 'service', label: 'Service Branding', labelAr: 'تصميم خدمة' },
  { id: 'rebrand', label: 'Rebranding', labelAr: 'إعادة بناء العلامة' },
  { id: 'other', label: 'Other', labelAr: 'أخرى' },
];

const ProjectFormDialog = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const { language, isRTL } = useLanguage();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectType: [],
    projectTypeOther: '',
    brandName: '',
    industry: '',
    targetAudience: '',
    brandDescription: '',
    name: '',
    email: '',
    whatsapp: '',
    website: '',
  });

  const totalSteps = 3;

  const toggleProjectType = (id: string) => {
    setFormData(prev => ({
      ...prev,
      projectType: prev.projectType.includes(id)
        ? prev.projectType.filter(t => t !== id)
        : [...prev.projectType, id],
    }));
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 1) return formData.projectType.length > 0;
    if (step === 2) return formData.brandName.trim() !== '';
    if (step === 3) return formData.name.trim() !== '' && formData.email.trim() !== '';
    return false;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-project-inquiry', {
        body: formData,
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error('Submit error:', err);
      toast({
        title: language === 'ar' ? 'حدث خطأ' : 'Something went wrong',
        description: language === 'ar' ? 'يرجى المحاولة مرة أخرى' : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else handleSubmit();
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setSubmitted(false);
      setFormData({
        projectType: [], projectTypeOther: '', brandName: '', industry: '',
        targetAudience: '', brandDescription: '', name: '', email: '', whatsapp: '', website: '',
      });
    }, 300);
  };

  const en = language === 'en';

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[520px] p-0 gap-0 border-border/50 bg-background overflow-hidden">
        <DialogTitle className="sr-only">
          {en ? 'Start a Project' : 'ابدأ مشروعك'}
        </DialogTitle>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: submitted ? '100%' : `${(step / totalSteps) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-10" dir={isRTL ? 'rtl' : 'ltr'}>
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                {en ? 'Thank you!' : 'شكراً لك!'}
              </h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {en
                  ? "We've received your inquiry. We'll get back to you within 24 hours."
                  : 'لقد استلمنا استفسارك. سنعود إليك خلال 24 ساعة.'}
              </p>
              <Button variant="hero" size="lg" onClick={handleClose} className="mt-4">
                {en ? 'Close' : 'إغلاق'}
              </Button>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
                  {en ? `Step ${step} of ${totalSteps}` : `${step} من ${totalSteps}`}
                </span>
              </div>

              {/* Step 1: Project Type */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-up">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                      {en ? 'What do you need?' : 'ماذا تحتاج؟'}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {en ? 'Select all that apply.' : 'اختر كل ما ينطبق.'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {PROJECT_TYPES.map(type => (
                      <button
                        key={type.id}
                        onClick={() => toggleProjectType(type.id)}
                        className={`px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 text-start
                          ${formData.projectType.includes(type.id)
                            ? 'border-primary bg-primary/5 text-foreground ring-1 ring-primary'
                            : 'border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground'
                          }`}
                      >
                        {en ? type.label : type.labelAr}
                      </button>
                    ))}
                  </div>
                  {formData.projectType.includes('other') && (
                    <Input
                      placeholder={en ? 'Please specify...' : 'يرجى التحديد...'}
                      value={formData.projectTypeOther}
                      onChange={e => updateField('projectTypeOther', e.target.value)}
                      className="bg-transparent border-border/60 focus:border-primary"
                    />
                  )}
                </div>
              )}

              {/* Step 2: Brand Details */}
              {step === 2 && (
                <div className="space-y-5 animate-fade-up">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                      {en ? 'Tell us about your brand' : 'أخبرنا عن علامتك'}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {en ? 'Help us understand your vision.' : 'ساعدنا في فهم رؤيتك.'}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'Brand / Business Name' : 'اسم العلامة التجارية'} *
                      </label>
                      <Input
                        value={formData.brandName}
                        onChange={e => updateField('brandName', e.target.value)}
                        placeholder={en ? 'e.g. Bloom Cafe' : 'مثال: مقهى بلوم'}
                        className="bg-transparent border-border/60 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'Industry / Sector' : 'القطاع / الصناعة'}
                      </label>
                      <Input
                        value={formData.industry}
                        onChange={e => updateField('industry', e.target.value)}
                        placeholder={en ? 'e.g. Food & Beverage, Tech, Fashion' : 'مثال: أغذية، تقنية، أزياء'}
                        className="bg-transparent border-border/60 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'Target Audience' : 'الجمهور المستهدف'}
                      </label>
                      <Input
                        value={formData.targetAudience}
                        onChange={e => updateField('targetAudience', e.target.value)}
                        placeholder={en ? 'e.g. Young professionals, 25-40' : 'مثال: محترفون شباب، 25-40'}
                        className="bg-transparent border-border/60 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'Brief Description' : 'وصف مختصر'}
                      </label>
                      <Textarea
                        value={formData.brandDescription}
                        onChange={e => updateField('brandDescription', e.target.value)}
                        placeholder={en ? 'Tell us about your brand, goals, style preferences...' : 'أخبرنا عن علامتك وأهدافك وتفضيلاتك...'}
                        className="bg-transparent border-border/60 focus:border-primary min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <div className="space-y-5 animate-fade-up">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                      {en ? 'How can we reach you?' : 'كيف نتواصل معك؟'}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {en ? "We'll respond within 24 hours." : 'سنرد خلال 24 ساعة.'}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'Your Name' : 'اسمك'} *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={e => updateField('name', e.target.value)}
                        placeholder={en ? 'Full name' : 'الاسم الكامل'}
                        className="bg-transparent border-border/60 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'Email Address' : 'البريد الإلكتروني'} *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={e => updateField('email', e.target.value)}
                        placeholder={en ? 'you@example.com' : 'you@example.com'}
                        className="bg-transparent border-border/60 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'WhatsApp Number' : 'رقم واتساب'}
                      </label>
                      <Input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={e => updateField('whatsapp', e.target.value)}
                        placeholder={en ? '+971 50 XXX XXXX' : '+971 50 XXX XXXX'}
                        className="bg-transparent border-border/60 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        {en ? 'Website (if any)' : 'الموقع الإلكتروني (إن وجد)'}
                      </label>
                      <Input
                        type="url"
                        value={formData.website}
                        onChange={e => updateField('website', e.target.value)}
                        placeholder="https://"
                        className="bg-transparent border-border/60 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {en ? 'Back' : 'رجوع'}
                  </button>
                ) : (
                  <div />
                )}
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed() || submitting}
                  className="min-w-[140px]"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : step === totalSteps ? (
                    <>
                      {en ? 'Submit' : 'إرسال'}
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      {en ? 'Continue' : 'التالي'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
