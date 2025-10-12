'use client'

import { useRef, useEffect } from 'react';
import css from './BookForm.module.css'
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/airbnb.css'
import type { Options as FlatpickrOptions } from 'flatpickr/dist/types/options'
import type { Instance as FlatpickrInstance } from 'flatpickr/dist/types/instance'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function BookForm() {
  const dateRef = useRef<HTMLInputElement>(null);
  const fpRef = useRef<FlatpickrInstance | null>(null)

  const openPicker = () => fpRef.current?.open();

  useEffect(() => {
    if (!dateRef.current) return

    const opts: FlatpickrOptions = {
    minDate: 'today',
    dateFormat: 'd M Y',        
    clickOpens: false,
    disableMobile: true,
    locale: {
    firstDayOfWeek: 1,
    weekdays: {
      shorthand: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
      longhand:  ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    },
    months: {
      longhand:  ['January','February','March','April','May','June','July','August','September','October','November','December'],
      shorthand: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    },
  },
    prevArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 9 16" aria-hidden="true">
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
        d="M8.70711 0.292893C9.09763 0.683417 9.09763 1.31658 8.70711 1.70711L2.41421 8L8.70711 14.2929C9.09763 14.6834 9.09763 15.3166 8.70711 15.7071C8.31658 16.0976 7.68342 16.0976 7.29289 15.7071L0.292894 8.70711C-0.0976311 8.31658 -0.0976311 7.68342 0.292894 7.29289L7.29289 0.292893C7.68342 -0.097631 8.31658 -0.0976311 8.70711 0.292893Z"/>
    </svg>`,
    nextArrow: `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 9 16" aria-hidden="true">
      <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"
        d="M0.292893 15.7071C-0.0976311 15.3166 -0.0976312 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976317 1.31658 -0.0976318 0.683417 0.292893 0.292893C0.683417 -0.0976315 1.31658 -0.0976315 1.70711 0.292893L8.70711 7.29289C9.09763 7.68342 9.09763 8.31658 8.70711 8.70711L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071Z"/>
    </svg>`,
    monthSelectorType: 'static', 
    onReady(_, __, inst) {
      inst.calendarContainer?.classList.add(css.bookCalendar);
      const year = inst.currentYearElement as HTMLInputElement | null;
    if (year) {
      year.readOnly = true;
      year.tabIndex = -1;
      (year.parentElement as HTMLElement | null)?.querySelectorAll('.arrowUp,.arrowDown')
        .forEach(el => (el as HTMLElement).style.display = 'none');
      year.addEventListener('wheel', e => e.preventDefault(), { passive: false });
    }
      const hasVal = !!inst.input.value;
      inst.input.classList.toggle(css.hasValue ?? 'has-value', hasVal); 
      
    },
    onOpen(_, __, inst) {
      inst.calendarContainer?.classList.add(css.bookCalendar);
    },
    onValueUpdate(_, str, inst) {
      inst.input.classList.toggle('has-value', !!str);
    },
  };

  const created = flatpickr(dateRef.current, opts);
  fpRef.current = Array.isArray(created) ? created[0] : created;

  return () => { fpRef.current?.destroy(); fpRef.current = null; };
}, []);

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = new FormData(e.currentTarget);
    const payload = {
      name: (form.get('name') as string).trim(),
      email: (form.get('email') as string).trim(),
      date: fpRef.current?.selectedDates?.[0]?.toISOString() ?? '',
      camperId: 1
    }

    if(!payload.name || !payload.email || !payload.date) {
      toast.warn('Please fill out all the fields.')
      return
    }

      try {
      const key = 'bookings';
      const prev = JSON.parse(localStorage.getItem(key) ?? '[]');
      localStorage.setItem(key, JSON.stringify([...prev, payload]));
      toast.success('Booking created successfully')
      e.currentTarget.reset();
      fpRef.current?.clear();
      dateRef.current?.classList.remove(css.hasValue ?? 'has-value'); 
    } catch {
      toast.error('There was an error while creating the booking')
    }
  }

    return (
        <div className={css.container}>
            <h2 className={css.title}>Book your campervan now</h2>
            <p className={css.text}>Stay connected! We are always ready to help you.</p>
            <form className={css.form} onSubmit={handleSubmit}>
                <input name="name" className={css.name} placeholder='Name*'/>
                <input name="email" className={css.email} placeholder='Email*'/>
         <div         
        className={css.field}
        onClick={openPicker}
        role="button"
        aria-label="Open date picker"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openPicker()}
        tabIndex={0}>
           <input          
          ref={dateRef}
          type="text"
          id="date"
          className={css.date}
          required     
          inputMode="none"   
          onKeyDown={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()} />
           <label
             htmlFor="date"
             className={css.placeholder}
             data-default="Booking date*"
              data-active="Select a date between today"
  />
         </div>
                <textarea name="" id="" className={css.textarea} placeholder='Comment'></textarea>
                <button type='submit' className={css.button}>Send</button>
            </form>
            <ToastContainer position="top-center" />
        </div>
    )
}
    